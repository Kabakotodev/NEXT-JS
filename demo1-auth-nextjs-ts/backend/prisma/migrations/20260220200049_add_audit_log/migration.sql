/*
  Warnings:

  - You are about to drop the column `entity` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `auditlog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `entity`,
    DROP COLUMN `entityId`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `ipAddress` VARCHAR(191) NULL,
    ADD COLUMN `targetUser` INTEGER NULL,
    ADD COLUMN `userAgent` VARCHAR(191) NULL;
