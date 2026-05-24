/*
  Warnings:

  - You are about to drop the column `categorieId` on the `regime` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `regime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `regime` DROP FOREIGN KEY `Regime_categorieId_fkey`;

-- DropForeignKey
ALTER TABLE `regime` DROP FOREIGN KEY `Regime_documentId_fkey`;

-- AlterTable
ALTER TABLE `regime` DROP COLUMN `categorieId`,
    DROP COLUMN `documentId`;

-- CreateTable
CREATE TABLE `_RegimeDocuments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RegimeDocuments_AB_unique`(`A`, `B`),
    INDEX `_RegimeDocuments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RegimeCategories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RegimeCategories_AB_unique`(`A`, `B`),
    INDEX `_RegimeCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RegimeDocuments` ADD CONSTRAINT `_RegimeDocuments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Document`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RegimeDocuments` ADD CONSTRAINT `_RegimeDocuments_B_fkey` FOREIGN KEY (`B`) REFERENCES `Regime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RegimeCategories` ADD CONSTRAINT `_RegimeCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RegimeCategories` ADD CONSTRAINT `_RegimeCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Regime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
