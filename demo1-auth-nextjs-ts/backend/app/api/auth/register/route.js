// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const {
//       prenom,
//       nom,
//       contact,
//       serviceId,
//       role,
//       username,
//       password,
//       mustChangePassword
//     } = body;

//     if (!prenom || !nom || !username || !password || !serviceId || !role) {
//       return Response.json(
//         { error: "Champs obligatoires manquants" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { username }
//     });

//     if (existingUser) {
//       return Response.json(
//         { error: "Username déjà utilisé" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // const user = await prisma.user.create({
//     //   data: {
//     //     prenom,
//     //     nom,
//     //     contact,
//     //     serviceId,
//     //     role,
//     //     username,
//     //     password: hashedPassword,
//     //     mustChangePassword: mustChangePassword ?? false
//     //   }
//     // });

//     await prisma.user.create({
//   data: {
//     prenom,
//     nom,
//     contact,
//     username,
//     password: hashedPassword,
//     role,
//     mustChangePassword: mustChangePassword ?? false,

//     service: {
//       connect: { id: serviceId }   // ✅ IMPORTANT
//     }
//   }
// });


//     return Response.json({
//       message: "Utilisateur créé",
//       user
//     });

//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     return Response.json(
//       { error: "Erreur serveur" },
//       { status: 500 }
//     );
//   }
// }


// ########################    ##################################
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      prenom,
      nom,
      contact,
      serviceId,
      roleId,
      username,
      password,
      mustChangePassword
    } = body;

    if (!prenom || !nom || !username || !password || !serviceId || !roleId) {
      return Response.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const parsedServiceId = Number(serviceId);

    if (isNaN(parsedServiceId)) {
      return Response.json(
        { error: "Service invalide" },
        { status: 400 }
      );
    }

    const serviceExists = await prisma.service.findUnique({
      where: { id: parsedServiceId }
    });

    if (!serviceExists) {
      return Response.json(
        { error: "Service introuvable" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return Response.json(
        { error: "Username déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const parsedRoleId = Number(roleId);
    // const parsedServiceId = Number(serviceId);

    const user = await prisma.user.create({
    data: {
        prenom,
        nom,
        contact,
        username,
        password: hashedPassword,
        mustChangePassword: mustChangePassword ?? false,

        role: {
        connect: { id: parsedRoleId }
        },

        service: {
        connect: { id: parsedServiceId }
        }
    }
    });


    // 🔥 AUDIT
    // await logUserAction({
    //   action: "REGISTER",
    //   performedById: user.id,
    //   targetUserId: user.id,
    //   description: "Création de compte",
    //   request
    // });
    // //

    return Response.json({
      message: "Utilisateur créé",
      user
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }

  // 🔥 Audit register
  await prisma.auditLog.create({
    data: {
      action: "REGISTER_USER",
      adminId: decoded?.id || null,
      userId: user.id
    }
  });

}
