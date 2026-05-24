import { prisma } from "./prisma.service";
import bcrypt from "bcryptjs";

const PASSWORD_EXPIRATION_DAYS = 90;
const WARNING_DAYS = 15;

// export const createUser = async (data: any) => {
export const createUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      contact: data.contact,
      username: data.username,
      password: hashedPassword,
      roleId: data.roleId,
      serviceId: data.serviceId,
      active: true,
      passwordLastChanged: new Date(),
      forcePasswordChange: false,
    },
  });
};

const MAX_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;

export const authenticateUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true }
  });

  if (!user) throw new Error("Identifiants incorrects");

  // 🔒 Vérifier si compte verrouillé
  if (user.lockUntil && user.lockUntil > new Date()) {
    const remainingMs = user.lockUntil.getTime() - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 60000);

    throw new Error(
      `Compte verrouillé. Réessayez dans ${remainingMinutes} minute(s)`
    );
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    const attempts = user.failedLoginAttempts + 1;

    if (attempts >= MAX_ATTEMPTS) {
      const lockUntil = new Date(
        Date.now() + LOCK_TIME_MINUTES * 60 * 1000
      );

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockUntil
        }
      });

      throw new Error(
        `Compte verrouillé pour ${LOCK_TIME_MINUTES} minutes`
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: attempts }
    });

    throw new Error(
      `Mot de passe incorrect (${attempts}/${MAX_ATTEMPTS})`
    );
  }

  // ✅ Login réussi → reset compteur
  await prisma.user.update({
    where: { id: user.id },
    data: {
      failedLoginAttempts: 0,
      lockUntil: null
    }
  });

  return { user };
};

// 
// export const changePassword = async (
export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Utilisateur introuvable");

  // Vérifier ancien mot de passe
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) throw new Error("Ancien mot de passe incorrect");

  // Hash nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 🔐 Mise à jour + reset expiration
  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      passwordLastChanged: new Date(),
      forcePasswordChange: false,
    },
  });
};

//
// 🔎 READ – Tous les utilisateurs (sans password)
export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      prenom: true,
      nom: true,
      contact: true,
      username: true,
      active: true,
      passwordLastChanged: true,
      forcePasswordChange: true,
      role: true,
      service: true,
      roleId: true,
      serviceId: true,
    },
    orderBy: { id: "desc" }
  });
};

// 🔎 READ – Un seul utilisateur
export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      prenom: true,
      nom: true,
      contact: true,
      username: true,
      active: true,
      passwordLastChanged: true,
      forcePasswordChange: true,
      roleId: true,
      serviceId: true,
    },
  });
};

// ✏ UPDATE (SANS password)
export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data: {
      prenom: data.prenom,
      nom: data.nom,
      contact: data.contact,
      username: data.username,
      roleId: data.roleId,
      serviceId: data.serviceId,
      active: data.active,
      forcePasswordChange: data.forcePasswordChange,
    },
  });
};

// 🗑 DELETE USER MULTIPLE
export const deleteUsers = async (ids: number[]) => {
  return prisma.$transaction(async (tx) => {

    // 🔐 Supprimer refresh tokens
    await tx.refreshToken.deleteMany({
      where: { userId: { in: ids } }
    });

    // 📜 Supprimer audit logs
    await tx.auditLog.deleteMany({
      where: { userId: { in: ids } }
    });

    // 👤 Supprimer utilisateurs
    return tx.user.deleteMany({
      where: { id: { in: ids } }
    });

  });
};

// DELETE ONE USER
export const deleteUser = async (id: number) => {
  return prisma.$transaction(async (tx) => {

    await tx.refreshToken.deleteMany({
      where: { userId: id }
    });

    await tx.auditLog.deleteMany({
      where: { userId: id }
    });

    return tx.user.delete({
      where: { id }
    });

  });
};

//
export const adminResetPassword = async (
  userId: number,
  newPassword: string
) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      passwordLastChanged: new Date(),
      forcePasswordChange: false,
    },
  });
};
