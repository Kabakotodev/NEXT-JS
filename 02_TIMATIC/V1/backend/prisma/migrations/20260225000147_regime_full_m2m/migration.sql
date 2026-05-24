/*
  Warnings:

  - You are about to drop the column `nationaliteId` on the `regime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `regime` DROP FOREIGN KEY `Regime_nationaliteId_fkey`;

-- AlterTable
ALTER TABLE `regime` DROP COLUMN `nationaliteId`;

-- CreateTable
CREATE TABLE `_RegimeNationalites` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RegimeNationalites_AB_unique`(`A`, `B`),
    INDEX `_RegimeNationalites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RegimeNationalites` ADD CONSTRAINT `_RegimeNationalites_A_fkey` FOREIGN KEY (`A`) REFERENCES `Nationalite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RegimeNationalites` ADD CONSTRAINT `_RegimeNationalites_B_fkey` FOREIGN KEY (`B`) REFERENCES `Regime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
