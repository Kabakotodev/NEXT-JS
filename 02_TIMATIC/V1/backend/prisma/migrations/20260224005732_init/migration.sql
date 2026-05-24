-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomDocument` VARCHAR(191) NOT NULL,
    `sigleDocument` VARCHAR(191) NOT NULL,
    `descDocument` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Document_nomDocument_key`(`nomDocument`),
    UNIQUE INDEX `Document_sigleDocument_key`(`sigleDocument`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nationalite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomPays` VARCHAR(191) NOT NULL,
    `codePays` VARCHAR(191) NOT NULL,
    `nationaliteFr` VARCHAR(191) NOT NULL,
    `nationaliteEn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nationalite_nomPays_key`(`nomPays`),
    UNIQUE INDEX `Nationalite_codePays_key`(`codePays`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomCategorie` VARCHAR(191) NOT NULL,
    `descCategorie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categorie_nomCategorie_key`(`nomCategorie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomRegime` VARCHAR(191) NOT NULL,
    `descRegime` VARCHAR(191) NOT NULL,
    `objetRegime` LONGTEXT NOT NULL,
    `documentId` INTEGER NOT NULL,
    `categorieId` INTEGER NOT NULL,
    `nationaliteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regime` ADD CONSTRAINT `Regime_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Regime` ADD CONSTRAINT `Regime_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Regime` ADD CONSTRAINT `Regime_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `Nationalite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
