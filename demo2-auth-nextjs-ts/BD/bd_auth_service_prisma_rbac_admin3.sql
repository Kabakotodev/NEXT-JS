-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 16 fév. 2026 à 22:16
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
-- Base de données : `bd_auth_service_prisma_rbac_admin3`
--

-- --------------------------------------------------------

--
-- Structure de la table `auditlog`
--

CREATE TABLE `auditlog` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `ipAddress` varchar(191) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `auditlog`
--

INSERT INTO `auditlog` (`id`, `userId`, `action`, `createdAt`, `ipAddress`, `username`) VALUES
(1, 1, 'LOGIN_SUCCESS', '2026-02-16 20:51:39.773', '::ffff:127.0.0.1', 'admin'),
(2, 2, 'LOGIN_SUCCESS', '2026-02-16 20:53:21.468', '::ffff:127.0.0.1', 'user1'),
(3, 3, 'LOGIN_SUCCESS', '2026-02-16 20:54:39.490', '::ffff:127.0.0.1', 'ctthiouf');

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
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzcxMjc1Mjc5LCJleHAiOjE3NzE4ODAwNzl9.jboJxP_t4WeZ_NZAxAigFR0X3-F4bkDuMPzAMmvFWVM', 3, '2026-02-16 20:54:39.485', '2026-02-23 20:54:39.484');

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
(1, 'ADMIN', 'Administrateur systÃ¨me'),
(2, 'SUPERVISEUR_MOD', 'Supervision avancÃ©e'),
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
(1, 'Informatique', 'IT', 'Service Informatique', 'it@entreprise.com', 'Diallo', 'Mr', 'IngÃ©nieur Principal', 'Directeur IT'),
(2, 'Finance', 'FIN', 'Gestion financiÃ¨re', 'finance@entreprise.com', 'Sow', 'Mme', 'Inspecteur Principal', 'Directrice FinanciÃ¨re'),
(3, 'Ressources Humaines', 'RH', 'Gestion du personnel', 'rh@entreprise.com', 'Ba', 'Mr', 'Conseiller', 'Directeur RH'),
(4, 'Secretariat Particulier du CSA', 'SP CSA', 'Secretariat Particulier du Commissaire Special de l\'AIBD', '77 529 00 37', 'Waly CAMARA', 'Mr', 'Commissaire de Police Divisionnaire', 'Commissaire chargÃ© du Commissariat Special de l\'AIBD');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `prenom` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `contact` varchar(191) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `roleId` int(11) DEFAULT NULL,
  `serviceId` int(11) NOT NULL,
  `mustChangePassword` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `prenom`, `nom`, `contact`, `username`, `password`, `actif`, `roleId`, `serviceId`, `mustChangePassword`) VALUES
(1, 'Abdoulaye', 'DIALLO', '77 973 73 33', 'admin', '$2a$10$l9W/SrF8isZ7MYb5wEowD.TGvufWICDqV7lnK/TBM39scPNiqOTB.', 1, 1, 1, 0),
(2, 'Kaba', 'KOTO', '76 012 13 13', 'user1', '$2a$10$kLso4u0MLgLjo4FOvCdUB.RZA.g6Xka6IfmDbxgco7QeYie1/kQxm', 1, 3, 4, 0),
(3, 'Cheikh Tidiane', 'THIOUF', '77', 'ctthiouf', '$2a$10$VBQbLwHEwsa7R262K1d4VOhUpTr4d6nMEnlsaqjQIsYsaduFFwhYu', 1, 4, 4, 0);

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
('05a0bdc9-c2b0-4fcd-997d-6433baf1e026', 'fa9c7decfba2d85bef017f266408abfb50e98a8bf9de0858bb7d5d8b230d6391', '2026-02-16 20:41:07.686', '20260216204107_add_audit_logs', NULL, NULL, '2026-02-16 20:41:07.663', 1),
('1e9c666a-71ff-4dc1-976f-14f121949efd', '274d7e6e2f666e0e97d5aaea7c67e93a1a9dccbd82aa212ab3fe952ba6f4549b', '2026-02-16 20:41:05.528', '20260216201659_add_expires_at_refresh_token', NULL, NULL, '2026-02-16 20:41:05.507', 1),
('5a675ad3-015d-493b-8fe2-393c46edd392', '60e4c15f3b732c20d255bfb25839d4056b251745d69d57525307df4a4f874939', '2026-02-16 20:41:05.301', '20260215010146_add_refresh_token', NULL, NULL, '2026-02-16 20:41:05.161', 1),
('66fe0d80-1eae-46fb-ae10-d8bcae5e715d', 'cc9a14b2b526fbe6b889e68cd9b55ae396cce5f3addce74a7c6663625faf6354', '2026-02-16 20:41:05.609', '20260216201857_make_expires_at_required', NULL, NULL, '2026-02-16 20:41:05.530', 1),
('6b7ffe57-9ee1-4bb9-97c2-a513c3219bea', '3968c116aaaeff3eb62e9cb6d31d75f3a05b0bc739af8b4ce77a58f650167926', '2026-02-16 20:41:05.155', '20260213193612_init', NULL, NULL, '2026-02-16 20:41:04.827', 1),
('83a9b3ba-d604-4e54-bf6e-bc925e27afb5', '3828ce78ddf4828fc36b03b0d004dcb66a330dffa9e79220f1e664189906909d', '2026-02-16 20:41:05.323', '20260215020201_add_must_change_password', NULL, NULL, '2026-02-16 20:41:05.304', 1),
('93d48520-e19e-4e72-a3ea-fd9f98149232', 'cf9f6c9234038207bd531d4f2008997a67b6d895d80067a4e3c18b7ee8578533', '2026-02-16 20:41:05.504', '20260216002908_fix_role_relation', NULL, NULL, '2026-02-16 20:41:05.328', 1);

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
  ADD KEY `User_serviceId_fkey` (`serviceId`),
  ADD KEY `User_roleId_fkey` (`roleId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
