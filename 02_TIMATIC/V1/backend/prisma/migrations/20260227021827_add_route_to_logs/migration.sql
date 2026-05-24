/*
  Warnings:

  - Added the required column `route` to the `VisaSearchLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `visasearchlog` ADD COLUMN `route` VARCHAR(191) NOT NULL;
