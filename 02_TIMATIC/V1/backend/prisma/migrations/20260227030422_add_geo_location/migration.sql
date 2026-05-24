-- AlterTable
ALTER TABLE `visasearchlog` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `countryCode` VARCHAR(191) NULL,
    ADD COLUMN `countryName` VARCHAR(191) NULL;
