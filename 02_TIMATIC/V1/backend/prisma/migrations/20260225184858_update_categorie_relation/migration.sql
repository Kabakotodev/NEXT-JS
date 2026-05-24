/*
  Warnings:

  - Added the required column `objetCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Categorie_nomCategorie_key` ON `categorie`;

-- AlterTable
ALTER TABLE `categorie` ADD COLUMN `objetCategorie` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `CategorieRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorieId` INTEGER NOT NULL,
    `documentId` INTEGER NOT NULL,
    `nationaliteId` INTEGER NOT NULL,

    UNIQUE INDEX `CategorieRelation_documentId_nationaliteId_key`(`documentId`, `nationaliteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategorieRelation` ADD CONSTRAINT `CategorieRelation_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieRelation` ADD CONSTRAINT `CategorieRelation_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieRelation` ADD CONSTRAINT `CategorieRelation_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `Nationalite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
