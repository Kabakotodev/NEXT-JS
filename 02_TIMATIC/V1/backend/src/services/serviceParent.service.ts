
import { prisma } from './prisma.service';

export const getAll = () => prisma.serviceParent.findMany();
export const getById = (id: number) => prisma.serviceParent.findUnique({ where: { id } });
export const create = (data: any) => prisma.serviceParent.create({ data });
export const update = (id: number, data: any) =>
  prisma.serviceParent.update({ where: { id }, data });
export const remove = (id: number) =>
  prisma.serviceParent.delete({ where: { id } });
