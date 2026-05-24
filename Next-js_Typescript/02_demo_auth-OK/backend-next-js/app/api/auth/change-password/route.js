import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logUserAction } from "@/lib/auditUser";

export async function POST(req) {
  try {
    const { oldPassword, newPassword } = await req.json();

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return Response.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return Response.json(
        { error: "Ancien mot de passe incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        mustChangePassword: false
      }
    });

    // 🔥 AUDIT
    await logUserAction({
      action: "PASSWORD_RESET",
      performedById: user.id,
      targetUserId: user.id,
      description: "Réinitialisation mot de passe",
      req
    });
    //

    return Response.json({ message: "Mot de passe modifié avec succès" });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }

  //
  await prisma.auditLog.create({
    data: {
      action: "CHANGE_PASSWORD",
      userId: decoded.id
    }
  });

}
