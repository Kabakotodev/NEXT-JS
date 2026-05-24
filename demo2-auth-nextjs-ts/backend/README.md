
# AUTH SERVICE ENTERPRISE PRISMA RBAC

## Installation

1. CREATE DATABASE bd_auth_service_prisma_rbac_admin;

2. npm install
3. cp .env.example .env

4. npx prisma generate
   npx prisma migrate dev --name init

5. npm run prisma:seed
6. npm run dev

Service: http://localhost:4000

Login test:
POST /api/auth
{
  "type": "login",
  "username": "admin",
  "password": "admin123"
}

##############################################################
http://localhost:4000
🔷 1️⃣ CRUD – ROLES
✅ CREATE ROLE
POST

/api/admin/roles
Body (JSON) :

{
  "nom_role": "SUPERVISEUR",
  "desc_role": "Superviseur opérationnel"
}
✅ GET ALL ROLES
GET

/api/admin/roles
✅ UPDATE ROLE (si vous ajoutez PUT)
{
  "id": 2,
  "nom_role": "SUPERVISEUR_MOD",
  "desc_role": "Supervision avancée"
}
✅ DELETE ROLE (si route DELETE ajoutée)
{
  "id": 2
}
🔷 2️⃣ CRUD – SERVICES
✅ CREATE SERVICE
POST

/api/admin/services
{
  "nom_service": "Finance",
  "sigle_service": "FIN",
  "desc_service": "Gestion financière",
  "contact_service": "finance@entreprise.com",
  "nom_chef_service": "Sow",
  "statut_chef_service": "Mme",
  "grade_chef_service": "Inspecteur Principal",
  "fonction_chef_service": "Directrice Financière"
}
✅ GET ALL SERVICES
GET

/api/admin/services
✅ CREATE SECOND SERVICE (test supplémentaire)
{
  "nom_service": "Ressources Humaines",
  "sigle_service": "RH",
  "desc_service": "Gestion du personnel",
  "contact_service": "rh@entreprise.com",
  "nom_chef_service": "Ba",
  "statut_chef_service": "Mr",
  "grade_chef_service": "Conseiller",
  "fonction_chef_service": "Directeur RH"
}
🔷 3️⃣ CRUD – USERS
⚠ Important :
Vous devez utiliser des roleId et serviceId existants.

Exemple :

roleId = 1 (ADMIN)

serviceId = 1 (Informatique)

✅ CREATE USER
POST

/api/admin/users
{
  "prenom": "Fatou",
  "nom": "Diallo",
  "contact": "771234567",
  "username": "fdiallo",
  "password": "$2a$10$7QJY8q9XQ0pUeHKn3mXvXODxR271GGBqBPdZiZsaAJ2bX7IuAv89e",
  "roleId": 1,
  "serviceId": 2
}
⚠ Le password doit être hashé si votre route ne le fait pas automatiquement.

Si vous voulez que le backend hash automatiquement, dites-le moi et je vous donne la version améliorée.

✅ GET ALL USERS
GET

/api/admin/users
✅ USER INACTIF TEST
Pour tester le blocage :

{
  "prenom": "Test",
  "nom": "Inactive",
  "contact": "770000001",
  "username": "inactive",
  "password": "$2a$10$7QJY8q9XQ0pUeHKn3mXvXODxR271GGBqBPdZiZsaAJ2bX7IuAv89e",
  "roleId": 1,
  "serviceId": 1,
  "actif": false
}
Puis tester login :

{
  "type": "login",
  "username": "inactive",
  "password": "admin123"
}
Réponse attendue :

Compte désactivé; veuillez contacter l'administrateur
🧪 4️⃣ LOGIN TEST
POST

/api/auth
{
  "type": "login",
  "username": "admin",
  "password": "admin123"
}
