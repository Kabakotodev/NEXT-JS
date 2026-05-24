import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { logAudit } from "@/lib/audit";

async function verifyAdmin(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw { status: 401, message: "Token manquant" };

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { role: true }
  });

  if (!user || user.role?.nom_role !== "ADMIN") {
    throw { status: 403, message: "Accès refusé" };
  }

  return user;
}

export async function DELETE(req) {
  try {

    const admin = await verifyAdmin(req);
    const { logIds } = await req.json();

    if (!Array.isArray(logIds) || logIds.length === 0) {
      return Response.json(
        { error: "Aucun log sélectionné" },
        { status: 400 }
      );
    }

    await prisma.auditLog.deleteMany({
      where: {
        id: { in: logIds }
      }
    });

    // 🔥 Log de la suppression des logs
    await logAudit({
      action: "AUDIT_LOG_DELETION",
      performedBy: admin.id,
      description: `Suppression de ${logIds.length} log(s)`,
      req
    });

    return Response.json({
      message: "Logs supprimés avec succès"
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}