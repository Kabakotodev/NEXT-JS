import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET ALL CATEGORIES
 */
export const getAll = async () => {
  return prisma.categorie.findMany({
    include: {
      relations: {
        include: {
          document: true,
          nationalite: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

/**
 * GET BY ID
 */
export const getById = async (id: number) => {
  return prisma.categorie.findUnique({
    where: { id },
    include: {
      relations: {
        include: {
          document: true,
          nationalite: true,
        },
      },
    },
  });
};

/**
 * CREATE CATEGORIE
 */
export const create = async (data: any) => {
  try {
    return await prisma.categorie.create({
      data: {
        nomCategorie: data.nomCategorie,
        descCategorie: data.descCategorie,
        objetCategorie: data.objetCategorie,

        relations: {
          create: data.relations.map((r: any) => ({
            documentId: Number(r.documentId),
            nationaliteId: Number(r.nationaliteId),
          })),
        },
      },
      include: {
        relations: {
          include: {
            document: true,
            nationalite: true,
          },
        },
      },
    });
  } catch (error: any) {
    handlePrismaError(error);
  }
};

/**
 * UPDATE CATEGORIE
 */
export const update = async (id: number, data: any) => {
  try {
    return await prisma.categorie.update({
      where: { id },
      data: {
        nomCategorie: data.nomCategorie,
        descCategorie: data.descCategorie,
        objetCategorie: data.objetCategorie,

        relations: {
          deleteMany: {}, // reset all relations
          create: data.relations.map((r: any) => ({
            documentId: Number(r.documentId),
            nationaliteId: Number(r.nationaliteId),
          })),
        },
      },
      include: {
        relations: {
          include: {
            document: true,
            nationalite: true,
          },
        },
      },
    });
  } catch (error: any) {
    handlePrismaError(error);
  }
};

/**
 * DELETE SINGLE
 */
export const remove = async (id: number) => {
  return prisma.categorie.delete({
    where: { id },
  });
};

/**
 * BULK DELETE
 */
export const bulkDelete = async (ids: number[]) => {
  return prisma.categorie.deleteMany({
    where: {
      id: {
        in: ids.map((id) => Number(id)),
      },
    },
  });
};

/**
 * HANDLE PRISMA ERRORS (duplication etc.)
 */
function handlePrismaError(error: any): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === "P2002") {
      throw new Error(
        "Ce document est déjà associé à cette nationalité dans une autre catégorie."
      );
    }
  }

  console.error("PRISMA ERROR:", error);
  throw new Error("Erreur base de données.");
}