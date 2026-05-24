import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) throw { status: 401, message: "Token manquant" };

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw { status: 401, message: "Token invalide" };
  }

  const admin = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { role: true }
  });

  if (!admin || admin.role?.nom_role !== "ADMIN") {
    throw { status: 403, message: "Accès refusé" };
  }
}

export async function GET(req, { params }) {
  try {

    await verifyAdmin(req);

    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      include: {
        role: true,
        service: true
      }
    });

    if (!user) {
      return Response.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    return Response.json({
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      contact: user.contact,
      username: user.username,
      role: user.role?.nom_role,
      service: user.service?.nom_service
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
