import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

import { corsHeaders } from "@/lib/cors";


export async function PATCH(request, { params }) {
  try {
    const token = request.headers
      .get("authorization")
      ?.split(" ")[1];

    if (!token) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    });

    if (!user || user.role.nom_role !== "ADMIN") {
      return Response.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { actif } = await request.json();

    const updated = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { actif }
    });

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}
