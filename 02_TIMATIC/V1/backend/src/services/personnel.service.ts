
import { prisma } from './prisma.service';

// export const getAll = () => prisma.personnel.findMany();
// export const getById = (id: number) => prisma.personnel.findUnique({ where: { id } });
// export const create = (data: any) => prisma.personnel.create({ data });
export const update = (id: number, data: any) =>
  prisma.personnel.update({ where: { id }, data });
export const remove = (id: number) =>
  prisma.personnel.delete({ where: { id } });
//
export const create = async (data:any) => {

  return prisma.personnel.create({

    data:{
      matricule:data.matricule,
      prenom_personnel:data.prenom_personnel,
      nom_personnel:data.nom_personnel,
      adresse_personnel:data.adresse_personnel,
      contact_personnel:data.contact_personnel,
      image_personnel:data.image_personnel,
      service_id:data.service_id
    }

  })

}
//
export const getAll = async () => {
  return prisma.personnel.findMany({
    include:{
      service:true
    }
  })
}
//
export const getById = async (id:number)=>{
  return prisma.personnel.findUnique({
    where:{id},
    include:{
      service:true
    }
  })
}
