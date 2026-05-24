import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {

  // Gestion CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(),
    });
  }

  // Protection routes admin
  if (request.nextUrl.pathname.startsWith('/api/admin')) {

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "ADMIN") {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
      }

    } catch {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }
  }

  const response = NextResponse.next();
  Object.entries(corsHeaders()).forEach(([key, value]) =>
    response.headers.set(key, value)
  );

  return response;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export const config = {
  matcher: '/api/:path*',
};
