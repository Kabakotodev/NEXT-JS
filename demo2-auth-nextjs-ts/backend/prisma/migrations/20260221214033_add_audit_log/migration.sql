/*
  Warnings:

  - You are about to drop the column `performedBy` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `targetUser` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the `auditactionuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auditactionuser` DROP FOREIGN KEY `AuditActionUser_performedById_fkey`;

-- DropForeignKey
ALTER TABLE `auditactionuser` DROP FOREIGN KEY `AuditActionUser_targetUserId_fkey`;

-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_performedBy_fkey`;

-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `performedBy`,
    DROP COLUMN `targetUser`,
    ADD COLUMN `performedById` INTEGER NULL,
    ADD COLUMN `targetUserId` INTEGER NULL;

-- DropTable
DROP TABLE `auditactionuser`;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_performedById_fkey` FOREIGN KEY (`performedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
