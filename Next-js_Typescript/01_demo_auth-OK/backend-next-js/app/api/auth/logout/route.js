import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return Response.json({ error: "Token manquant" }, { status: 400 });
    }

    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });

    return Response.json({ message: "Déconnexion réussie" });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }

  await prisma.auditLog.create({
    data: {
        action: "LOGOUT",
        username: "unknown",
        ipAddress: req.headers.get("x-forwarded-for") || "LOCAL"
    }
    });

}
