// import { prisma } from "@/lib/prisma";
// import jwt from "jsonwebtoken";
// import { logUserAction } from "@/lib/audit";

// function verifyAdmin(req) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   if (decoded.role !== "ADMIN") throw new Error("Accès refusé");
// }

// export async function PUT(req) {
//   try {
//     verifyAdmin(req);

//     const body = await req.json();

//     await prisma.user.update({
//       where: { id: body.id },
//       data: {
//         prenom: body.prenom,
//         nom: body.nom,
//         contact: body.contact,
//         username: body.username,
//         roleId: body.roleId,
//         serviceId: body.serviceId
//       }
//     });
//     return Response.json({ success: true });

//   } catch (error) {
//     return Response.json(
//       { error: error.message },
//       { status: 400 }
//     );
//   }
// }

// #########################    ##################################
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { logUserAction } from "@/lib/auditUser";

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();

    await prisma.user.update({
      where: { id: body.id },
      data: {
        prenom: body.prenom,
        nom: body.nom,
        contact: body.contact,
        roleId: body.roleId,
        serviceId: body.serviceId
      }
    });

    await logUserAction({
      action: "UPDATE_USER",
      performedById: decoded.id,
      targetUserId: body.id,
      description: "Modification utilisateur",
      req
    });

    //
    await prisma.user.updateMany({
      where: { id: { in: userIds } },
      data: { actif: false }
    });

    for (const id of userIds) {
      await logUserAction({
        action: "DESACTIVATE_USER",
        performedById: admin.id,
        targetUserId: id,
        description: "Désactivation compte",
        req
      });
    }
    //
    await prisma.user.update({
        where: { id },
        data: { actif: true }
      });

      await logUserAction({
        action: "ACTIVATE_USER",
        performedById: admin.id,
        targetUserId: id,
        description: "Activation compte",
        req
      });
      //

    return Response.json({ success: true });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}