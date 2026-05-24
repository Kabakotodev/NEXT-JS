/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `refreshtoken` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `user` table. All the data in the column will be lost.
  - Made the column `prenom` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `expiresAt`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatar`,
    DROP COLUMN `last_login`,
    MODIFY `prenom` VARCHAR(191) NOT NULL,
    MODIFY `nom` VARCHAR(191) NOT NULL,
    MODIFY `roleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
