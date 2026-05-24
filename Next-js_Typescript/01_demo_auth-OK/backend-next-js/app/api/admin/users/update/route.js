import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { logUserAction } from "@/lib/audit";

function verifyAdmin(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "ADMIN") throw new Error("Accès refusé");
}

export async function PUT(req) {
  try {
    verifyAdmin(req);

    const body = await req.json();

    await prisma.user.update({
      where: { id: body.id },
      data: {
        prenom: body.prenom,
        nom: body.nom,
        contact: body.contact,
        username: body.username,
        roleId: body.roleId,
        serviceId: body.serviceId
      }
    });

    //
    // await logUserAction({
    //   action: "UPDATE",
    //   performedById: admin.id,
    //   targetUserId: updatedUser.id,
    //   description: `Modification du compte ${updatedUser.username}`,
    //   req
    // });
    //

    return Response.json({ success: true });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
