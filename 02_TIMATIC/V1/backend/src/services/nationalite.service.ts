
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = () => prisma.nationalite.findMany()
export const getById = (id:number) => prisma.nationalite.findUnique({ where: { id } })
export const create = (data:any) => prisma.nationalite.create({ data })
export const update = (id:number,data:any)=>prisma.nationalite.update({where:{id},data})
export const remove = (id:number)=>prisma.nationalite.delete({where:{id}})
