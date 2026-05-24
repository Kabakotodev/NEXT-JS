/*
  Warnings:

  - Made the column `expiresAt` on table `refreshtoken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `expiresAt` DATETIME(3) NOT NULL;
