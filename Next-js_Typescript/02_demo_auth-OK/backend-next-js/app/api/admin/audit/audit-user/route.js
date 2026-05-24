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
// }

// export async function GET(req) {
//   try {
//     await verifyAdmin(req);

//     const logs = await prisma.auditActionUser.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         performedBy: {
//           select: { username: true }
//         },
//         targetUser: {
//           select: { username: true }
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

// async function verifyAdmin(req) {

//   const token = req.headers.get("authorization")?.split(" ")[1];

//   if (!token) {
//     throw { status: 401, message: "Token manquant" };
//   }

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

//     const logs = await prisma.auditActionUser.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         performedBy: {
//           select: {
//             username: true
//           }
//         },
//         targetUser: {
//           select: {
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