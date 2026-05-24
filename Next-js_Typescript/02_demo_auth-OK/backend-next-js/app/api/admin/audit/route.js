// import { prisma } from "@/lib/prisma";
// import jwt from "jsonwebtoken";

// async function verifyAdmin(req) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const user = await prisma.user.findUnique({
//     where: { id: decoded.id },
//     include: { role: true }
//   });

//   if (!user || user.role?.nom_role !== "ADMIN") {
//     throw { status: 403, message: "Accès refusé" };
//   }

//   return user;
// }

// export async function GET(req) {
//   try {
//     await verifyAdmin(req);

//     const logs = await prisma.auditLog.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         admin: {
//           select: {
//             prenom: true,
//             nom: true,
//             username: true
//           }
//         }
//       }
//     });

//     return Response.json(logs);

//   } catch (error) {
//     return Response.json(
//       { error: error.message },
//       { status: error.status || 500 }
//     );
//   }
// }

// ##############################  #########################################
// import { prisma } from "@/lib/prisma";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   jwt.verify(token, process.env.JWT_SECRET);

//   const logs = await prisma.auditLog.findMany({
//     include: {
//       performedBy: true,
//       targetUser: true
//     },
//     orderBy: { createdAt: "desc" }
//   });

//   return Response.json(logs);
// }

// #########################    ##################################
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function verifyAdmin(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw { status: 401, message: "Token manquant" };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

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

    if (user.role?.nom_role !== "ADMIN") {
      throw { status: 403, message: "Accès refusé" };
    }

    return user;

  } catch (error) {
    throw {
      status: error.status || 401,
      message: error.message || "Token invalide"
    };
  }
}

export async function GET(req) {
  try {

    await verifyAdmin(req);

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        performedBy: {
          select: {
            id: true,
            username: true,
            prenom: true,
            nom: true
          }
        },
        targetUser: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    return Response.json(logs);

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}