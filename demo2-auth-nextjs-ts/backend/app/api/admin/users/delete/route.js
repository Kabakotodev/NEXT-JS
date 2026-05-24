import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { createAudit } from "@/lib/audit";
import { logAudit } from "@/lib/audit";
import { logUserAction } from "@/lib/auditUser";

async function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw { status: 401, message: "Token manquant" };

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { role: true }
  });

  if (!admin || admin.role?.nom_role !== "ADMIN") {
    throw { status: 403, message: "Accès refusé" };
  }

  return admin;
}

export async function DELETE(req) {
  try {

    const admin = await verifyAdmin(req);
    const { userIds } = await req.json();

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return Response.json(
        { error: "Aucun utilisateur sélectionné" },
        { status: 400 }
      );
    }

    // ❌ Empêcher suppression de soi-même
    if (userIds.includes(admin.id)) {
      return Response.json(
        { error: "Vous ne pouvez pas désactiver votre propre compte" },
        { status: 400 }
      );
    }

    // 🔥 1️⃣ Compter ADMIN actifs
    const activeAdmins = await prisma.user.count({
      where: {
        actif: true,
        role: {
          nom_role: "ADMIN"
        }
      }
    });

    // 🔥 2️⃣ Compter combien d'ADMIN dans la sélection
    const adminsToDisable = await prisma.user.count({
      where: {
        id: { in: userIds },
        actif: true,
        role: {
          nom_role: "ADMIN"
        }
      }
    });

    // 🔥 3️⃣ Vérifier si on supprime le dernier ADMIN
    if (activeAdmins - adminsToDisable <= 0) {
      return Response.json(
        { error: "Impossible de désactiver le dernier ADMIN du système" },
        { status: 400 }
      );
    }

    // ✅ SOFT DELETE
    await prisma.user.updateMany({
      where: {
        id: { in: userIds }
      },
      data: {
        actif: false
      }
    });

    // 🔥 Forcer déconnexion
    await prisma.refreshToken.deleteMany({
      where: {
        userId: { in: userIds }
      }
    });

    return Response.json({
      message: "Utilisateurs désactivés avec succès"
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
 
  // Désactivation
  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: { actif: false }
  });
  

}
