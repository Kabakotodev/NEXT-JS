
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {

  const role = await prisma.role.create({
    data: { nom_role: "ADMIN", desc_role: "Administrateur système" }
  });

  const service = await prisma.service.create({
    data: {
      nom_service: "Informatique",
      sigle_service: "IT",
      desc_service: "Service Informatique",
      contact_service: "it@entreprise.com",
      nom_chef_service: "Diallo",
      statut_chef_service: "Mr",
      grade_chef_service: "Ingénieur Principal",
      fonction_chef_service: "Directeur IT"
    }
  });

  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      prenom: "Admin",
      nom: "System",
      contact: "770000000",
      username: "admin",
      password: hash,
      roleId: role.id,
      serviceId: service.id
    }
  });

  console.log("Seed terminé");
}

main().finally(() => prisma.$disconnect());
