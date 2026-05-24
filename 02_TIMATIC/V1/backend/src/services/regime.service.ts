
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// export const getById = (id:number) => prisma.regime.findUnique({ where: { id } })
// export const remove = (id:number)=>prisma.regime.delete({where:{id}})

// export const create = (data: any) =>
//   prisma.regime.create({
//     data: {
//       nomRegime: data.nomRegime,
//       descRegime: data.descRegime,
//       objetRegime: data.objetRegime,

//       documents: {
//         connect: data.documentIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },

//       categories: {
//         connect: data.categorieIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },

//       nationalites: {
//         connect: data.nationaliteIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },
//     },
//   });

//   export const update = (id: number, data: any) =>
//   prisma.regime.update({
//     where: { id },
//     data: {
//       nomRegime: data.nomRegime,
//       descRegime: data.descRegime,
//       objetRegime: data.objetRegime,

//       documents: {
//         set: [],
//         connect: data.documentIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },

//       categories: {
//         set: [],
//         connect: data.categorieIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },

//       nationalites: {
//         set: [],
//         connect: data.nationaliteIds.map((id: number) => ({
//           id: Number(id),
//         })),
//       },
//     },
//   });

//   export const getAll = () =>
//     prisma.regime.findMany({
//         include: {
//         documents: true,
//         categories: true,
//         nationalites: true,
//         },
//   });

// ####################################################################
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAll = () =>
  prisma.regime.findMany({
    include: {
      documents: true,
      categories: true,
      nationalites: true,
    },
  });

export const getById = (id: number) =>
  prisma.regime.findUnique({
    where: { id },
    include: {
      documents: true,
      categories: true,
      nationalites: true,
    },
  });

export const create = (data: any) =>
  prisma.regime.create({
    data: {
      nomRegime: data.nomRegime,
      descRegime: data.descRegime,
      objetRegime: data.objetRegime,

      documents: {
        connect: data.documentIds.map((id: number) => ({
          id: Number(id),
        })),
      },

      categories: {
        connect: data.categorieIds.map((id: number) => ({
          id: Number(id),
        })),
      },

      nationalites: {
        connect: data.nationaliteIds.map((id: number) => ({
          id: Number(id),
        })),
      },
    },
    include: {
      documents: true,
      categories: true,
      nationalites: true,
    },
  });

export const update = (id: number, data: any) =>
  prisma.regime.update({
    where: { id },
    data: {
      nomRegime: data.nomRegime,
      descRegime: data.descRegime,
      objetRegime: data.objetRegime,

      documents: {
        set: [],
        connect: data.documentIds.map((id: number) => ({
          id: Number(id),
        })),
      },

      categories: {
        set: [],
        connect: data.categorieIds.map((id: number) => ({
          id: Number(id),
        })),
      },

      nationalites: {
        set: [],
        connect: data.nationaliteIds.map((id: number) => ({
          id: Number(id),
        })),
      },
    },
    include: {
      documents: true,
      categories: true,
      nationalites: true,
    },
  });

export const remove = (id: number) =>
  prisma.regime.delete({
    where: { id },
  });

export const bulkDelete = (ids: number[]) =>
  prisma.regime.deleteMany({
    where: {
      id: { in: ids.map((id) => Number(id)) },
    },
  });