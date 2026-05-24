
# Backend MVC FULL - TypeScript + Prisma 5 + MySQL

## Installation
npm install

## Configuration
Créer un fichier .env :
DATABASE_URL="mysql://root:password@localhost:3306/mvc_db"

## Migration
npx prisma migrate dev --name init

## Lancer
npm run dev

Base URL:
http://localhost:5000

CRUD complets disponibles pour:
- roles
- service-parents
- services
- personnels
