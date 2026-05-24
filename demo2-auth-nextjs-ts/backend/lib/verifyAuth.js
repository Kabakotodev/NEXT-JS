import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function verifyAuth(req) {

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

  return user;
}
