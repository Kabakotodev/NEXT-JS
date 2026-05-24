/*
  Warnings:

  - You are about to drop the column `entity` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `auditlog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `entity`,
    DROP COLUMN `status`,
    ADD COLUMN `ipAddress` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;
