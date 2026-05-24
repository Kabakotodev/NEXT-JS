import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Token manquant" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 ADMIN ONLY
    if (decoded.role !== "ADMIN") {
      return Response.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return Response.json({ error: "Champs manquants" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json(
        { error: "Mot de passe trop court" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        mustChangePassword: true   // 🔥 Optionnel mais recommandé
      }
    });

    return Response.json({
      message: "Mot de passe modifié avec succès"
    });

  } catch (error) {
    console.error("ADMIN CHANGE PASSWORD ERROR:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }

  //
  await logAudit({
  action: "PASSWORD_RESET",
  performedBy: admin.id,
  targetUser: userId,
  description: "Réinitialisation mot de passe",
  req
});

}
