import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

/* ===============================
   VERIFY ADMIN + CHECK ACTIF
================================= */
async function verifyAdmin(req) {

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw { status: 401, message: "Token manquant" };
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw { status: 401, message: "Token invalide" };
  }

  // 🔥 Vérifier en base
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { role: true }
  });

  if (!user) {
    throw { status: 401, message: "Utilisateur introuvable" };
  }

  if (!user.actif) {
    throw { status: 403, message: "Compte désactivé" };
  }

  if (user.role?.nom_role !== "ADMIN") {
    throw { status: 403, message: "Accès refusé" };
  }

  return user;
}

/* ===============================
   GET ALL USERS
================================= */
export async function GET(req) {
  try {

    await verifyAdmin(req);

    const users = await prisma.user.findMany({
      include: {
        role: true,
        service: true
      }
    });

    const formattedUsers = users.map(u => ({
      id: u.id,
      prenom: u.prenom,
      nom: u.nom,
      contact: u.contact,          // ✅ AJOUT
      username: u.username,

      role: u.role?.nom_role || "N/A",
      roleId: u.roleId,            // ✅ AJOUT

      service: u.service?.nom_service || "N/A",
      serviceId: u.serviceId,      // ✅ AJOUT

      actif: u.actif,
      last_login: u.last_login,
      mustChangePassword: u.mustChangePassword
    }));

    return Response.json(formattedUsers);

  } catch (error) {

    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
