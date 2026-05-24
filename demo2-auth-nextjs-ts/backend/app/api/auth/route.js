// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { logAudit } from "@/lib/audit";
// import { logUserAction } from "@/lib/auditUser";

// export async function POST(req) {
//   try {
//     const { username, password } = await req.json();

//     console.log("LOGIN REQUEST:", username);

//     if (!username || !password) {
//       return Response.json({ error: "Champs manquants" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { username },
//       include: {
//         role: true,      // ✅ MINUSCULE
//         service: true
//       }
//     });

//     if (!user) {
//       return Response.json({ error: "Utilisateur introuvable" }, { status: 401 });
//     }

//     // 🚫 Compte bloqué
//     if (!user.actif) {
//       return Response.json(
//         { error: "Compte bloqué, veuillez contacter l'administrateur" },
//         { status: 403 }
//       );
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       await logAudit({
//         action: "LOGIN_FAILED",
//         performedBy: user.id,
//         targetUser: user.id,
//         description: "Mot de passe incorrect",
//         req
//       });
//       return Response.json({ error: "Mot de passe incorrect" }, { status: 401 });
//     }

//     // 🔥 LOGIN SUCCESS
//     await logAudit({
//       action: "LOGIN_SUCCESS",
//       performedBy: user.id,
//       targetUser: user.id,
//       description: "Connexion réussie",
//       req
//     });
    
//     //
//     await logUserAction({
//       action: "LOGIN_SUCCESS",
//       performedById: user.id,
//       targetUserId: user.id,
//       description: "Connexion réussie",
//       req
//     });

//     // 🔐 Access token
//     const accessToken = jwt.sign(
//       {
//         id: user.id,
//         role: user.role?.nom_role
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     // 🔁 Refresh token
//     const refreshToken = jwt.sign(
//       { id: user.id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: "7d" }
//     );

//     await prisma.refreshToken.create({
//       data: {
//         token: refreshToken,
//         userId: user.id,
//         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//       }
//     });

//     return Response.json({
//       accessToken,
//       refreshToken,
//       mustChangePassword: user.mustChangePassword,
//       user: {
//         id: user.id,
//         prenom: user.prenom,
//         nom: user.nom,
//         username: user.username,
//         role: user.role?.nom_role,
//         serviceId: user.serviceId,
//         actif: user.actif,
//         mustChangePassword: user.mustChangePassword
//       }
//     });

//   } catch (error) {
//     console.error("🔥 LOGIN ERROR:", error);
//     return Response.json({ error: "Erreur serveur" }, { status: 500 });
//   }

// }

// #########################    ##################################
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logAudit } from "@/lib/audit";
import { logUserAction } from "@/lib/auditUser";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    console.log("LOGIN REQUEST:", username);

    if (!username || !password) {
      return Response.json({ error: "Champs manquants" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
        service: true
      }
    });

    /* ===============================
       USER NOT FOUND
    ================================= */
    if (!user) {

      // 🔥 LOGIN FAILED (user inexistant)
      await logUserAction({
        action: "LOGIN_FAILED",
        performedById: null,
        targetUserId: null,
        description: `Tentative avec username inconnu: ${username}`,
        req
      });

      return Response.json(
        { error: "Utilisateur introuvable" },
        { status: 401 }
      );
    }

    /* ===============================
       COMPTE DESACTIVE
    ================================= */
    if (!user.actif) {

      await logUserAction({
        action: "LOGIN_FAILED",
        performedById: user.id,
        targetUserId: user.id,
        description: "Tentative connexion compte désactivé",
        req
      });

      return Response.json(
        { error: "Compte bloqué, veuillez contacter l'administrateur" },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    /* ===============================
       PASSWORD INCORRECT
    ================================= */
    if (!passwordMatch) {

      await logAudit({
        action: "LOGIN_FAILED",
        performedBy: user.id,
        targetUser: user.id,
        description: "Mot de passe incorrect",
        req
      });

      // 🔥 AJOUT logUserAction
      await logUserAction({
        action: "LOGIN_FAILED",
        performedById: user.id,
        targetUserId: user.id,
        description: "Mot de passe incorrect",
        req
      });

      return Response.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    /* ===============================
       LOGIN SUCCESS
    ================================= */

    await logAudit({
      action: "LOGIN_SUCCESS",
      performedBy: user.id,
      targetUser: user.id,
      description: "Connexion réussie",
      req
    });

    await logUserAction({
      action: "LOGIN_SUCCESS",
      performedById: user.id,
      targetUserId: user.id,
      description: "Connexion réussie",
      req
    });

    // 🔐 Access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role?.nom_role
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 🔁 Refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return Response.json({
      accessToken,
      refreshToken,
      mustChangePassword: user.mustChangePassword,
      user: {
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        username: user.username,
        role: user.role?.nom_role,
        serviceId: user.serviceId,
        actif: user.actif,
        mustChangePassword: user.mustChangePassword
      }
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);

    // 🔥 LOG ERREUR SERVEUR
    await logUserAction({
      action: "LOGIN_ERROR",
      description: error.message,
      req
    });

    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}