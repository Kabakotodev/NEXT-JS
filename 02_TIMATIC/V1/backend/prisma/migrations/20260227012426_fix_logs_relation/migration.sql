-- CreateTable
CREATE TABLE `VisaSearchLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nationaliteId` INTEGER NOT NULL,
    `documentId` INTEGER NOT NULL,
    `resultFound` BOOLEAN NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisaSearchLog` ADD CONSTRAINT `VisaSearchLog_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `Nationalite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisaSearchLog` ADD CONSTRAINT `VisaSearchLog_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
