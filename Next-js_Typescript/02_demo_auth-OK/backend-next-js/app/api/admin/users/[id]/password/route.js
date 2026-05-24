import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { corsHeaders } from "@/lib/cors";

export async function PATCH(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Non autorisé" }),
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return new Response(
        JSON.stringify({ error: "Accès refusé" }),
        { status: 403, headers: corsHeaders }
      );
    }

    const { newPassword } = await req.json();

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        password: hashed,
        mustChangePassword: false
      }
    });

    return new Response(
      JSON.stringify({ message: "Mot de passe modifié" }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error("PASSWORD ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}
