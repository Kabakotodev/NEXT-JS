
import { prisma } from './prisma.service';

// export const getAll = () => prisma.service.findMany();
export const getAll = async () => {
  return prisma.service.findMany({
    include: {
      serviceParent: true
    }
  })
}

// export const getById = (id: number) => prisma.service.findUnique({ where: { id } });
export const getById = async (id: number) => {

  return prisma.service.findUnique({
    where: { id },
    include: {
      serviceParent: true
    }
  })

}

export const create = (data: any) => prisma.service.create({ data });
export const update = (id: number, data: any) =>
  prisma.service.update({ where: { id }, data });
export const remove = (id: number) =>
  prisma.service.delete({ where: { id } });
