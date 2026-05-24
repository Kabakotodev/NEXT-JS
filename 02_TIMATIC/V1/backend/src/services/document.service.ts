
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = () => prisma.document.findMany()
export const getById = (id:number) => prisma.document.findUnique({ where: { id } })
export const create = (data:any) => prisma.document.create({ data })
export const update = (id:number,data:any)=>prisma.document.update({where:{id},data})
export const remove = (id:number)=>prisma.document.delete({where:{id}})
