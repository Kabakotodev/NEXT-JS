/*
  Warnings:

  - You are about to drop the column `adminId` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `targetUserId` on the `auditlog` table. All the data in the column will be lost.
  - Added the required column `entity` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performedBy` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `adminId`,
    DROP COLUMN `targetUserId`,
    ADD COLUMN `entity` VARCHAR(191) NOT NULL,
    ADD COLUMN `entityId` INTEGER NULL,
    ADD COLUMN `performedBy` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_performedBy_fkey` FOREIGN KEY (`performedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
