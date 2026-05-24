-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 16 fév. 2026 à 22:17
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_auth_service_prisma_rbac_admin2`
--

-- --------------------------------------------------------

--
-- Structure de la table `auditlog`
--

CREATE TABLE `auditlog` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(191) NOT NULL,
  `entity` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `auditlog`
--

INSERT INTO `auditlog` (`id`, `userId`, `action`, `entity`, `status`, `createdAt`) VALUES
(1, 1, 'LOGIN', 'AUTH', 'SUCCESS', '2026-02-13 22:22:18.002');

-- --------------------------------------------------------

--
-- Structure de la table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `id` int(11) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiresAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `token`, `userId`, `createdAt`, `expiresAt`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE3MzQxLCJleHAiOjE3NzE3MjIxNDF9.RNFHgjhn1N3-fx03SZZTLzc_HtoGdUUXJByLjiZT42s', 1, '2026-02-15 01:02:21.443', '2026-02-22 01:02:21.439'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE3Mzc1LCJleHAiOjE3NzE3MjIxNzV9.ubPRQ28aAqgjZ-bstVfFMrpyApkK1P_CxOwfJ09B9HQ', 1, '2026-02-15 01:02:55.682', '2026-02-22 01:02:55.678'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE3NDQ1LCJleHAiOjE3NzE3MjIyNDV9.4-IXJ-rqj9pKuQFUNCDNbpLG4D6tqa9Gfzm8hZ19vuM', 1, '2026-02-15 01:04:05.091', '2026-02-22 01:04:05.089'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE3NDc0LCJleHAiOjE3NzE3MjIyNzR9.4cywh9ed9b5OJg3DOquT5XQ4oYunpzhNWfwhCKo0ggo', 1, '2026-02-15 01:04:34.615', '2026-02-22 01:04:34.614'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE3OTQ1LCJleHAiOjE3NzE3MjI3NDV9.ANiSuIU65fgTqNwX9LDEJaVF-VDXsq4DyAaigSxnLcc', 1, '2026-02-15 01:12:25.242', '2026-02-22 01:12:25.238'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE4MDA5LCJleHAiOjE3NzE3MjI4MDl9.vA0pqiNf3_hlr8QPdKMfGqKlfOFkEev8kbccMMi-BfU', 1, '2026-02-15 01:13:29.447', '2026-02-22 01:13:29.446'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE4NDIwLCJleHAiOjE3NzE3MjMyMjB9.yDQuRGs83e9kKT2WSXIL9_DDkyC-sGeTyaWCtWWgQEo', 1, '2026-02-15 01:20:20.134', '2026-02-22 01:20:20.132'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE4NDUxLCJleHAiOjE3NzE3MjMyNTF9.NW2QXAzcovAUo8xnJq74VwlUchYSu8vJYZgdNZKWvNw', 1, '2026-02-15 01:20:51.505', '2026-02-22 01:20:51.502'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE4NTY1LCJleHAiOjE3NzE3MjMzNjV9.OzWj7hdpxpib4n8VDOEJFZgTOOtTQ9DIT8IBmS5dzSk', 1, '2026-02-15 01:22:45.247', '2026-02-22 01:22:45.246'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE5MzEwLCJleHAiOjE3NzE3MjQxMTB9.pU1sBNZncm_8mQK2faH1gMRO-e5nPXzgH04G7Qvb1L4', 1, '2026-02-15 01:35:10.495', '2026-02-22 01:35:10.493'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE5NTA1LCJleHAiOjE3NzE3MjQzMDV9.Qa-egMtSBDFteCZ2INPbcguXzzWdwrzOCmMX-SUlO_w', 1, '2026-02-15 01:38:25.129', '2026-02-22 01:38:25.127'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxMTE5ODk4LCJleHAiOjE3NzE3MjQ2OTh9.Y2VhSjmTO1T6fsS9xY7aD21kgrB-YCVSPX0u2CQTPqo', 1, '2026-02-15 01:44:58.534', '2026-02-22 01:44:58.532');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nom_role` varchar(191) NOT NULL,
  `desc_role` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom_role`, `desc_role`) VALUES
(1, 'ADMIN', 'Administrateur système'),
(2, 'SUPERVISEUR_MOD', 'Supervision avancée'),
(3, 'USER', 'Utilisateur'),
(4, 'SP_CSA', 'Secretariat particulier du CSA'),
(5, 'FICHIER', 'Fichier'),
(6, 'SecreataireDeBrigade', 'Secretaire de brigade'),
(7, 'ROLE 7', 'Role 07');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `nom_service` varchar(191) NOT NULL,
  `sigle_service` varchar(191) DEFAULT NULL,
  `desc_service` varchar(191) DEFAULT NULL,
  `contact_service` varchar(191) DEFAULT NULL,
  `nom_chef_service` varchar(191) DEFAULT NULL,
  `statut_chef_service` varchar(191) DEFAULT NULL,
  `grade_chef_service` varchar(191) DEFAULT NULL,
  `fonction_chef_service` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `nom_service`, `sigle_service`, `desc_service`, `contact_service`, `nom_chef_service`, `statut_chef_service`, `grade_chef_service`, `fonction_chef_service`) VALUES
(1, 'Informatique', 'IT', 'Service Informatique', 'it@entreprise.com', 'Diallo', 'Mr', 'Ingénieur Principal', 'Directeur IT'),
(2, 'Finance', 'FIN', 'Gestion financière', 'finance@entreprise.com', 'Sow', 'Mme', 'Inspecteur Principal', 'Directrice Financière'),
(3, 'Ressources Humaines', 'RH', 'Gestion du personnel', 'rh@entreprise.com', 'Ba', 'Mr', 'Conseiller', 'Directeur RH'),
(4, 'Secretariat Particulier du CSA', 'SP CSA', 'Secretariat Particulier du Commissaire Special de l\'AIBD', '77 529 00 37', 'Waly CAMARA', 'Mr', 'Commissaire de Police Divisionnaire', 'Commissaire chargé du Commissariat Special de l\'AIBD');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `prenom` varchar(191) DEFAULT NULL,
  `nom` varchar(191) DEFAULT NULL,
  `contact` varchar(191) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` datetime(3) DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `prenom`, `nom`, `contact`, `username`, `password`, `actif`, `last_login`, `avatar`, `roleId`, `serviceId`) VALUES
(1, 'Admin', 'System', '770000000', 'admin1', '$2a$10$kB/OhUjARTXPYZHxqYk2S.EqElrc.IrH7UvM5R/EKWQLMdpsNEOZi', 1, '2026-02-15 01:44:58.512', NULL, 1, 1),
(2, 'Fatou', 'Diallo', '771234567', 'fdiallo', '$2a$10$7QJY8q9XQ0pUeHKn3mXvXODxR271GGBqBPdZiZsaAJ2bX7IuAv89e', 1, NULL, NULL, 1, 2),
(3, 'Test', 'Inactive', '770000001', 'inactive', '$2a$10$7QJY8q9XQ0pUeHKn3mXvXODxR271GGBqBPdZiZsaAJ2bX7IuAv89e', 0, NULL, NULL, 1, 1),
(4, 'Abdoulaye ', 'DIALLO', '77 973 73 33', 'admin', 'password', 1, NULL, NULL, 1, 1),
(5, 'Kaba', 'KOTO', '76 012 13 13', 'useer1', 'password', 1, NULL, NULL, 3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('23faf878-395d-4211-b7ae-64cc8c685649', '3968c116aaaeff3eb62e9cb6d31d75f3a05b0bc739af8b4ce77a58f650167926', '2026-02-13 19:36:12.756', '20260213193612_init', NULL, NULL, '2026-02-13 19:36:12.329', 1),
('91a021c9-f080-487a-aa3b-4e9a4fb09e59', '60e4c15f3b732c20d255bfb25839d4056b251745d69d57525307df4a4f874939', '2026-02-15 01:01:47.132', '20260215010146_add_refresh_token', NULL, NULL, '2026-02-15 01:01:46.961', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auditlog`
--
ALTER TABLE `auditlog`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RefreshToken_token_key` (`token`),
  ADD KEY `RefreshToken_userId_fkey` (`userId`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Role_nom_role_key` (`nom_role`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_nom_service_key` (`nom_service`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD KEY `User_roleId_fkey` (`roleId`),
  ADD KEY `User_serviceId_fkey` (`serviceId`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auditlog`
--
ALTER TABLE `auditlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `User_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
