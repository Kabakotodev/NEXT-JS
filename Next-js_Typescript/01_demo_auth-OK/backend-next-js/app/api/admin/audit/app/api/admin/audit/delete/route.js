import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function verifyAdmin(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
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

    await verifyAdmin(req);

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return Response.json(
        { error: "Aucun log sélectionné" },
        { status: 400 }
      );
    }

    await prisma.auditLog.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return Response.json({
      message: "Logs supprimés avec succès"
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}