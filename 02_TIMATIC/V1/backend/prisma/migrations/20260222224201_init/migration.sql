-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomRole` VARCHAR(191) NOT NULL,
    `descRole` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceParent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomServiceParent` VARCHAR(191) NOT NULL,
    `sigleServiceParent` VARCHAR(191) NOT NULL,
    `descServiceParent` VARCHAR(191) NOT NULL,
    `contactServiceParent` VARCHAR(191) NULL,
    `adresseServiceParent` VARCHAR(191) NULL,
    `statutChefServiceParent` VARCHAR(191) NOT NULL,
    `nomChefServiceParent` VARCHAR(191) NOT NULL,
    `gradeChefServiceParent` VARCHAR(191) NOT NULL,
    `fonctionChefServiceParent` VARCHAR(191) NOT NULL,
    `contactChefServiceParent` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomService` VARCHAR(191) NOT NULL,
    `sigleService` VARCHAR(191) NOT NULL,
    `descService` VARCHAR(191) NOT NULL,
    `contactService` VARCHAR(191) NULL,
    `adresseService` VARCHAR(191) NULL,
    `statutChefService` VARCHAR(191) NOT NULL,
    `nomChefService` VARCHAR(191) NOT NULL,
    `gradeChefService` VARCHAR(191) NOT NULL,
    `fonctionChefService` VARCHAR(191) NOT NULL,
    `contactChefService` VARCHAR(191) NOT NULL,
    `serviceParentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricule` VARCHAR(191) NOT NULL,
    `prenom_personnel` VARCHAR(191) NOT NULL,
    `nom_personnel` VARCHAR(191) NOT NULL,
    `adresse_personnel` VARCHAR(191) NOT NULL,
    `contact_personnel` VARCHAR(191) NOT NULL,
    `image_personnel` VARCHAR(191) NULL,
    `service_id` INTEGER NOT NULL,

    UNIQUE INDEX `Personnel_matricule_key`(`matricule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_serviceParentId_fkey` FOREIGN KEY (`serviceParentId`) REFERENCES `ServiceParent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personnel` ADD CONSTRAINT `Personnel_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
