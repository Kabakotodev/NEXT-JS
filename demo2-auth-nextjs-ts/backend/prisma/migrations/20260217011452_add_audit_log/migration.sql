/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `auditlog` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `ipAddress`,
    DROP COLUMN `userId`,
    DROP COLUMN `username`,
    ADD COLUMN `adminId` INTEGER NOT NULL,
    ADD COLUMN `targetUserId` INTEGER NULL;
