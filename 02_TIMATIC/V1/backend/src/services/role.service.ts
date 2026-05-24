
import { prisma } from './prisma.service';

export const getAll = () => prisma.role.findMany();
export const getById = (id: number) => prisma.role.findUnique({ where: { id } });
export const create = (data: any) => prisma.role.create({ data });
export const update = (id: number, data: any) =>
  prisma.role.update({ where: { id }, data });
export const remove = (id: number) =>
  prisma.role.delete({ where: { id } });
