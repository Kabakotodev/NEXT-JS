import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return Response.json({ error: "Refresh token manquant" }, { status: 401 });
    }

    // Vérifie signature
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Vérifie en base
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        userId: decoded.id
      }
    });

    if (!storedToken) {
      return Response.json({ error: "Refresh token invalide" }, { status: 403 });
    }

    // 🔥 ROTATION (supprimer ancien token)
    await prisma.refreshToken.delete({
      where: { id: storedToken.id }
    });

    // Générer nouveau access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Générer nouveau refresh token
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Sauvegarder nouveau refresh token
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: decoded.id
      }
    });

    return Response.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    console.error("REFRESH ERROR:", error);
    return Response.json({ error: "Token invalide" }, { status: 403 });
  }
}
