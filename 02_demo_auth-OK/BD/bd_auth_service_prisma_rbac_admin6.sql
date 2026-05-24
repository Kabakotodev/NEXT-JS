-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 22 fév. 2026 à 00:41
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
-- Base de données : `bd_auth_service_prisma_rbac_admin6`
--

-- --------------------------------------------------------

--
-- Structure de la table `auditlog`
--

CREATE TABLE `auditlog` (
  `id` int(11) NOT NULL,
  `action` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `description` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `performedById` int(11) DEFAULT NULL,
  `targetUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `auditlog`
--

INSERT INTO `auditlog` (`id`, `action`, `createdAt`, `description`, `ipAddress`, `userAgent`, `performedById`, `targetUserId`) VALUES
(3, 'LOGIN_FAILED', '2026-02-21 21:47:17.896', 'Mot de passe incorrect', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1),
(4, 'LOGIN_SUCCESS', '2026-02-21 21:47:54.123', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 2, 2),
(5, 'LOGIN_SUCCESS', '2026-02-21 21:48:11.203', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1),
(6, 'UPDATE_USER', '2026-02-21 21:48:30.608', 'Modification utilisateur', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 5),
(7, 'LOGIN_SUCCESS', '2026-02-21 22:03:23.907', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1),
(8, 'LOGIN_SUCCESS', '2026-02-21 22:26:05.413', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1),
(9, 'LOGIN_SUCCESS', '2026-02-21 22:53:05.385', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1),
(10, 'LOGIN_SUCCESS', '2026-02-21 23:30:11.648', 'Connexion réussie', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 1, 1);

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
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcxNzE2NjExLCJleHAiOjE3NzIzMjE0MTF9.2wPOibEUizb9lThrMrtqdVl8kR0GoMm0kJs1v-4IzFs', 1, '2026-02-21 23:30:11.673', '2026-02-28 23:30:11.670');

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
(1, 'ADMIN', 'Administrateur systÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨me'),
(2, 'SUPERVISEUR_MOD', 'Supervision avancÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©e'),
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
(1, 'Informatique', 'IT', 'Service Informatique', 'it@entreprise.com', 'Diallo', 'Mr', 'IngÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©nieur Principal', 'Directeur IT'),
(2, 'Finance', 'FIN', 'Gestion financiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨re', 'finance@entreprise.com', 'Sow', 'Mme', 'Inspecteur Principal', 'Directrice FinanciÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨re'),
(3, 'Ressources Humaines', 'RH', 'Gestion du personnel', 'rh@entreprise.com', 'Ba', 'Mr', 'Conseiller', 'Directeur RH'),
(4, 'Secretariat Particulier du CSA', 'SP CSA', 'Secretariat Particulier du Commissaire Special de l\'AIBD', '77 529 00 37', 'Waly CAMARA', 'Mr', 'Commissaire de Police Divisionnaire', 'Commissaire chargÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© du Commissariat Special de l\'AIBD');

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
(3, 'Cheikh Tidiane', 'THIOUF', '71 mm', 'ctthiouf', '$2a$10$FFFhXYYILhoIJ3ve5XZhl.XmL1LoUZsuCdFoQnA3RHxCYVRAVV7b6', 1, 4, 4, 1),
(4, 'Moustapha', 'DIATTA', '77', 'mdiatta', '$2a$10$mnJ2tyB.xrLcbLiee/tMfefW6WqhinWeW8jlCw8dMALlkF8.bVBxu', 0, 5, 3, 0),
(5, 'Admin2', '02', '02', 'admin2', '$2a$10$Z6rc87BXUAsazO7y7ccuUOw2A8/iuLvc9.R65sotyhhwT3faKAZO.', 1, 1, 1, 0);

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
('0101f5ca-25b7-4997-b886-16dabd0c3b1b', '1fcc50408964790f7dcec2432ff0b8f6e3ff8a280f1acd00f5a09ecaea01c88b', '2026-02-21 21:40:31.104', '20260220221214_fix_audit_user_relation', NULL, NULL, '2026-02-21 21:40:30.856', 1),
('0186ddde-0a61-4bc4-94c8-5709cc8f6505', '3828ce78ddf4828fc36b03b0d004dcb66a330dffa9e79220f1e664189906909d', '2026-02-21 21:40:30.212', '20260215020201_add_must_change_password', NULL, NULL, '2026-02-21 21:40:30.186', 1),
('185c69e4-daf0-4668-90ed-359fd3d8e110', '274d7e6e2f666e0e97d5aaea7c67e93a1a9dccbd82aa212ab3fe952ba6f4549b', '2026-02-21 21:40:30.470', '20260216201659_add_expires_at_refresh_token', NULL, NULL, '2026-02-21 21:40:30.443', 1),
('403eff11-a3b9-4052-9980-a453fd92f08c', '3968c116aaaeff3eb62e9cb6d31d75f3a05b0bc739af8b4ce77a58f650167926', '2026-02-21 21:40:30.044', '20260213193612_init', NULL, NULL, '2026-02-21 21:40:29.691', 1),
('4ae98f4e-e058-4c0e-a81b-72ad973e9742', 'cf9f6c9234038207bd531d4f2008997a67b6d895d80067a4e3c18b7ee8578533', '2026-02-21 21:40:30.438', '20260216002908_fix_role_relation', NULL, NULL, '2026-02-21 21:40:30.215', 1),
('640472c8-27d0-4fb2-92ff-e53202519c50', '60e4c15f3b732c20d255bfb25839d4056b251745d69d57525307df4a4f874939', '2026-02-21 21:40:30.182', '20260215010146_add_refresh_token', NULL, NULL, '2026-02-21 21:40:30.049', 1),
('6c94b0ce-e3c1-42bd-9bf4-ce61e2d5b5f4', '91239a177b6a0fdce404ff605b566968a6b2ceb210181bd50e16ee937839e61a', '2026-02-21 21:40:30.825', '20260220005725_add_audit_relation', NULL, NULL, '2026-02-21 21:40:30.631', 1),
('6e0e1a30-1832-4eb1-a3dd-2c096ad9716b', '3cf643d16404cb4fbe986b63e5befb1d869a31614e220a3a2ba4c475b54bfa0f', '2026-02-21 21:40:34.284', '20260221214033_add_audit_log', NULL, NULL, '2026-02-21 21:40:33.905', 1),
('88a3499c-195b-44fd-9172-bfbd44919925', 'fa9c7decfba2d85bef017f266408abfb50e98a8bf9de0858bb7d5d8b230d6391', '2026-02-21 21:40:30.586', '20260216204107_add_audit_logs', NULL, NULL, '2026-02-21 21:40:30.560', 1),
('a725e7e6-8719-4664-a597-f6dd5bfb84f0', 'c1b18815ba484da9b5fe0c96c1beec31c87288ff82dd9f6b776034d97dcc146f', '2026-02-21 21:40:30.626', '20260217011452_add_audit_log', NULL, NULL, '2026-02-21 21:40:30.590', 1),
('a8b36fb5-b4f1-4ad5-b5f1-6661ed403fff', '25bf4d3992ba91b9c9e0b817cfca23663ec5c78b9d2b3a3950c878ce9274f8f9', '2026-02-21 21:40:30.852', '20260220200049_add_audit_log', NULL, NULL, '2026-02-21 21:40:30.829', 1),
('dc538534-efe1-4967-b7d6-d43ac9be4cd6', 'cc9a14b2b526fbe6b889e68cd9b55ae396cce5f3addce74a7c6663625faf6354', '2026-02-21 21:40:30.556', '20260216201857_make_expires_at_required', NULL, NULL, '2026-02-21 21:40:30.474', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auditlog`
--
ALTER TABLE `auditlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AuditLog_performedById_fkey` (`performedById`),
  ADD KEY `AuditLog_targetUserId_fkey` (`targetUserId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
-- Contraintes pour la table `auditlog`
--
ALTER TABLE `auditlog`
  ADD CONSTRAINT `AuditLog_performedById_fkey` FOREIGN KEY (`performedById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `AuditLog_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
