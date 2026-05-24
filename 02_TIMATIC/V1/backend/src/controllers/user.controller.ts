import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { prisma } from "../services/prisma.service";

export const changePassword = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // récupéré via JWT middleware
    const { oldPassword, newPassword } = req.body;

    const user = await userService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    res.json({ message: "Mot de passe modifié avec succès" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// //
// export const adminResetPassword = async (
//   userId: number,
//   newPassword: string
// ) => {
//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   return prisma.user.update({
//     where: { id: userId },
//     data: {
//       password: hashedPassword,
//       passwordLastChanged: new Date(),
//       forcePasswordChange: false,
//     },
//   });
// };

// 🔎 GET ALL
export const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

// 🔎 GET ONE
export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
};

// ✏ UPDATE USER (VERSION SÉCURISÉE)
export const updateUser = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { active, roleId } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const userToUpdate = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });

    if (!userToUpdate) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isAdmin = userToUpdate.role.nomRole === "ADMIN";

    // 🔐 1️⃣ Empêcher désactivation du dernier ADMIN
    if (active === false && isAdmin) {
      const activeAdminCount = await prisma.user.count({
        where: {
          role: { nomRole: "ADMIN" },
          active: true
        }
      });

      if (activeAdminCount <= 1) {
        return res.status(403).json({
          message: "Impossible de désactiver le dernier ADMIN actif."
        });
      }
    }

    // 🔐 2️⃣ Empêcher changement de rôle du dernier ADMIN
    if (roleId && isAdmin) {

      const newRole = await prisma.role.findUnique({
        where: { id: Number(roleId) }
      });

      if (newRole && newRole.nomRole !== "ADMIN") {

        const activeAdminCount = await prisma.user.count({
          where: {
            role: { nomRole: "ADMIN" },
            active: true
          }
        });

        if (activeAdminCount <= 1) {
          return res.status(403).json({
            message: "Impossible de retirer le rôle du dernier ADMIN actif."
          });
        }
      }
    }

    // 🔐 3️⃣ Empêcher self downgrade (optionnel mais recommandé)
    if (
      id === req.user.id &&
      roleId
    ) {
      const newRole = await prisma.role.findUnique({
        where: { id: Number(roleId) }
      });

      if (newRole && newRole.nomRole !== "ADMIN") {
        return res.status(403).json({
          message: "Vous ne pouvez pas retirer votre propre rôle ADMIN."
        });
      }
    }

    const updated = await userService.updateUser(id, req.body);

    res.json(updated);

  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

// DELETE SINGLE USER
export const deleteUser = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // 🔐 1. Bloquer suppression de soi-même
    if (id === req.user.id) {
      return res.status(403).json({
        message: "Vous ne pouvez pas supprimer votre propre compte."
      });
    }

    // 🔐 2. Vérifier si c'est un ADMIN
    const userToDelete = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });

    if (!userToDelete) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (userToDelete.role.nomRole === "ADMIN") {
      const adminCount = await prisma.user.count({
        where: {
          role: { nomRole: "ADMIN" },
          active: true
        }
      });

      if (adminCount <= 1) {
        return res.status(403).json({
          message: "Impossible de supprimer le dernier ADMIN actif."
        });
      }
    }

    await userService.deleteUser(id);

    res.json({ message: "Utilisateur supprimé" });

  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

// DELETE MULTIPLE USERS
export const deleteUsers = async (req: any, res: Response) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Liste des IDs invalide" });
    }

    // 🔐 1. Bloquer suppression de soi-même
    if (ids.includes(req.user.id)) {
      return res.status(403).json({
        message: "Vous ne pouvez pas supprimer votre propre compte."
      });
    }

    // 🔐 2. Vérifier suppression du dernier ADMIN
    const usersToDelete = await prisma.user.findMany({
      where: { id: { in: ids } },
      include: { role: true }
    });

    const adminsToDelete = usersToDelete.filter(
      (u) => u.role.nomRole === "ADMIN"
    );

    if (adminsToDelete.length > 0) {
      const totalActiveAdmins = await prisma.user.count({
        where: {
          role: { nomRole: "ADMIN" },
          active: true
        }
      });

      if (totalActiveAdmins - adminsToDelete.length <= 0) {
        return res.status(403).json({
          message: "Impossible de supprimer le dernier ADMIN actif."
        });
      }
    }

    const result = await userService.deleteUsers(ids);

    res.json({
      message: "Utilisateurs supprimés",
      count: result.count
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

//
export const toggleActive = async (req: Request, res: Response) => {
  const { active } = req.body;
  const updated = await userService.updateUser(
    Number(req.params.id),
    { active }
  );
  res.json(updated);
};

// EMPECHER DE DESACTIVER LE DERNIER ADMIN
export const deactivateUser = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const userToDeactivate = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });

    if (!userToDeactivate) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // 🔐 Vérifier si c'est un ADMIN
    if (userToDeactivate.role.nomRole === "ADMIN") {

      const activeAdminCount = await prisma.user.count({
        where: {
          role: { nomRole: "ADMIN" },
          active: true
        }
      });

      if (activeAdminCount <= 1) {
        return res.status(403).json({
          message: "Impossible de désactiver le dernier ADMIN actif."
        });
      }
    }

    await prisma.user.update({
      where: { id },
      data: { active: false }
    });

    res.json({ message: "Compte désactivé avec succès" });

  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

// ADMIN UPDATE PASSWORD
export const adminResetPassword = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères."
      });
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    await userService.adminResetPassword(id, newPassword);

    res.json({ message: "Mot de passe réinitialisé avec succès" });

  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Erreur serveur"
    });
  }
};