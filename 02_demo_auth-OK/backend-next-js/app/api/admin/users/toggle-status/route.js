import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Token manquant");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "ADMIN") {
    throw new Error("Accès refusé");
  }

  return decoded;
}

export async function POST(req) {
  try {
    verifyAdmin(req);

    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return Response.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        actif: !user.actif
      }
    });

    // 🔥 Si désactivation → supprimer ses refresh tokens
    if (!updatedUser.actif) {
      await prisma.refreshToken.deleteMany({
        where: { userId: userId }
      });
    }

    return Response.json({ message: "Statut modifié", actif: updatedUser.actif });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
}
