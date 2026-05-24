-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 fév. 2026 à 00:11
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
-- Base de données : `bd_ts_conditions_d_access_des_etrangers`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nomCategorie` varchar(191) NOT NULL,
  `descCategorie` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nomCategorie`, `descCategorie`) VALUES
(1, 'CATEGORIE 1', 'Dispense de visa'),
(2, 'CATEGORIE 2', 'Visa sans consultation préalable'),
(3, 'CATEGORIE 3', 'Visa avec consultation préalable obligatoire'),
(10, 'CAATEGORIE 4', 'Catégorie 4 mm');

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `nomDocument` varchar(191) NOT NULL,
  `sigleDocument` varchar(191) NOT NULL,
  `descDocument` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `document`
--

INSERT INTO `document` (`id`, `nomDocument`, `sigleDocument`, `descDocument`) VALUES
(1, 'Passeport Ordinaire', 'P.O', 'Passeport ordinaire'),
(2, 'Passeport de Service', 'P.S', 'Passeport de service'),
(3, 'Passeport Diplomatique', 'P.D', 'Passeport diplomatique'),
(10, 'Passeport d\'Urgence', 'P.U', 'Passeport d\'urgence MM');

-- --------------------------------------------------------

--
-- Structure de la table `nationalite`
--

CREATE TABLE `nationalite` (
  `id` int(11) NOT NULL,
  `nomPays` varchar(191) NOT NULL,
  `codePays` varchar(191) NOT NULL,
  `nationaliteFr` varchar(191) NOT NULL,
  `nationaliteEn` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `nationalite`
--

INSERT INTO `nationalite` (`id`, `nomPays`, `codePays`, `nationaliteFr`, `nationaliteEn`) VALUES
(1, 'NON RENSEIGNE', 'NR', 'NON RENSEIGNE', 'NOT PROVIDED'),
(2, 'Afghanistan', 'AFG', 'Afghane', 'Afghan'),
(3, 'Afrique du Sud', 'ZAF', 'Sud-africaine', 'South African'),
(4, 'Albanie', 'ALB', 'Albanaise', 'Albanian'),
(5, 'Algérie', 'DZA', 'Algérienne', 'Algerian'),
(6, 'Allemagne', 'DEU', 'Allemande', 'German'),
(7, 'Andorre', 'AND', 'Andorrane', 'Andorran'),
(8, 'Angola', 'AGO', 'Angolaise', 'Angolan'),
(9, 'Arabie Saoudite', 'SAU', 'Saoudienne', 'Saudi'),
(10, 'Argentine', 'ARG', 'Argentine', 'Argentinian'),
(11, 'Arménie', 'ARM', 'Arménienne', 'Armenian'),
(12, 'Australie', 'AUS', 'Australienne', 'Australian'),
(13, 'Autriche', 'AUT', 'Autrichienne', 'Austrian'),
(14, 'Azerbaïdjan', 'AZE', 'Azerbaïdjanaise', 'Azerbaijani'),
(15, 'Bahamas', 'BHS', 'Bahaméenne', 'Bahamian'),
(16, 'Bahreïn', 'BHR', 'Bahreïnienne', 'Bahraini'),
(17, 'Bangladesh', 'BGD', 'Bangladaise', 'Bangladeshi'),
(18, 'Belgique', 'BEL', 'Belge', 'Belgian'),
(19, 'Bénin', 'BEN', 'Béninoise', 'Beninese'),
(20, 'Bhoutan', 'BTN', 'Bhoutanaise', 'Bhutanese'),
(21, 'Bolivie', 'BOL', 'Bolivienne', 'Bolivian'),
(22, 'Bosnie-Herzégovine', 'BIH', 'Bosnienne', 'Bosnian'),
(23, 'Botswana', 'BWA', 'Botswanaise', 'Botswanan'),
(24, 'Brésil', 'BRA', 'Brésilienne', 'Brazilian'),
(25, 'Brunei', 'BRN', 'Brunéienne', 'Bruneian'),
(26, 'Bulgarie', 'BGR', 'Bulgare', 'Bulgarian'),
(27, 'Burkina Faso', 'BFA', 'Burkinabè', 'Burkinabe'),
(28, 'Burundi', 'BDI', 'Burundaise', 'Burundian'),
(29, 'Cambodge', 'KHM', 'Cambodgienne', 'Cambodian'),
(30, 'Cameroun', 'CMR', 'Camerounaise', 'Cameroonian'),
(31, 'Canada', 'CAN', 'Canadienne', 'Canadian'),
(32, 'Cap-Vert', 'CPV', 'Cap-verdienne', 'Cape Verdean'),
(33, 'Chili', 'CHL', 'Chilienne', 'Chilean'),
(34, 'Chine', 'CHN', 'Chinoise', 'Chinese'),
(35, 'Chypre', 'CYP', 'Chypriote', 'Cypriot'),
(36, 'Colombie', 'COL', 'Colombienne', 'Colombian'),
(37, 'Comores', 'COM', 'Comorienne', 'Comorian'),
(38, 'Congo', 'COG', 'Congolaise', 'Congolese'),
(39, 'Corée du Sud', 'KOR', 'Sud-coréenne', 'South Korean'),
(40, 'Corée du Nord', 'PRK', 'Nord-coréenne', 'North Korean'),
(41, 'Costa Rica', 'CRI', 'Costaricienne', 'Costa Rican'),
(42, 'Côte d’Ivoire', 'CIV', 'Ivoirienne', 'Ivorian'),
(43, 'Croatie', 'HRV', 'Croate', 'Croatian'),
(44, 'Cuba', 'CUB', 'Cubaine', 'Cuban'),
(45, 'Danemark', 'DNK', 'Danoise', 'Danish'),
(46, 'Djibouti', 'DJI', 'Djiboutienne', 'Djiboutian'),
(47, 'Égypte', 'EGY', 'Égyptienne', 'Egyptian'),
(48, 'Émirats arabes unis', 'ARE', 'Émirienne', 'Emirati'),
(49, 'Équateur', 'ECU', 'Équatorienne', 'Ecuadorian'),
(50, 'Espagne', 'ESP', 'Espagnole', 'Spanish'),
(51, 'Estonie', 'EST', 'Estonienne', 'Estonian'),
(52, 'Eswatini', 'SWZ', 'Swazie', 'Swazi'),
(53, 'États-Unis', 'USA', 'Américaine', 'American'),
(54, 'Éthiopie', 'ETH', 'Éthiopienne', 'Ethiopian'),
(55, 'Fidji', 'FJI', 'Fidjienne', 'Fijian'),
(56, 'Finlande', 'FIN', 'Finlandaise', 'Finnish'),
(57, 'France', 'FRA', 'Française', 'French'),
(58, 'Gabon', 'GAB', 'Gabonaise', 'Gabonese'),
(59, 'Gambie', 'GMB', 'Gambienne', 'Gambian'),
(60, 'Ghana', 'GHA', 'Ghanéenne', 'Ghanaian'),
(61, 'Grèce', 'GRC', 'Grecque', 'Greek'),
(62, 'Guinée', 'GIN', 'Guinéenne', 'Guinean'),
(63, 'Guinée-Bissau', 'GNB', 'Bissau-guinéenne', 'Bissau-Guinean'),
(64, 'Guinée équatoriale', 'GNQ', 'Équato-guinéenne', 'Equatorial Guinean'),
(65, 'Haïti', 'HTI', 'Haïtienne', 'Haitian'),
(66, 'Honduras', 'HND', 'Hondurienne', 'Honduran'),
(67, 'Hongrie', 'HUN', 'Hongroise', 'Hungarian'),
(68, 'Inde', 'IND', 'Indienne', 'Indian'),
(69, 'Indonésie', 'IDN', 'Indonésienne', 'Indonesian'),
(70, 'Irak', 'IRQ', 'Irakienne', 'Iraqi'),
(71, 'Iran', 'IRN', 'Iranienne', 'Iranian'),
(72, 'Irlande', 'IRL', 'Irlandaise', 'Irish'),
(73, 'Islande', 'ISL', 'Islandaise', 'Icelandic'),
(74, 'Israël', 'ISR', 'Israélienne', 'Israeli'),
(75, 'Italie', 'ITA', 'Italienne', 'Italian'),
(76, 'Jamaïque', 'JAM', 'Jamaïcaine', 'Jamaican'),
(77, 'Japon', 'JPN', 'Japonaise', 'Japanese'),
(78, 'Jordanie', 'JOR', 'Jordanienne', 'Jordanian'),
(79, 'Kazakhstan', 'KAZ', 'Kazakhstanaise', 'Kazakh'),
(80, 'Kenya', 'KEN', 'Kényane', 'Kenyan'),
(81, 'Kirghizistan', 'KGZ', 'Kirghize', 'Kyrgyz'),
(82, 'Koweït', 'KWT', 'Koweïtienne', 'Kuwaiti'),
(83, 'Laos', 'LAO', 'Laotienne', 'Lao'),
(84, 'Lesotho', 'LSO', 'Lesothane', 'Lesotho'),
(85, 'Lettonie', 'LVA', 'Lettonne', 'Latvian'),
(86, 'Liban', 'LBN', 'Libanaise', 'Lebanese'),
(87, 'Liberia', 'LBR', 'Libérienne', 'Liberian'),
(88, 'Libye', 'LBY', 'Libyenne', 'Libyan'),
(89, 'Lituanie', 'LTU', 'Lituanienne', 'Lithuanian'),
(90, 'Luxembourg', 'LUX', 'Luxembourgeoise', 'Luxembourgish'),
(91, 'Madagascar', 'MDG', 'Malgache', 'Malagasy'),
(92, 'Malaisie', 'MYS', 'Malaisienne', 'Malaysian'),
(93, 'Malawi', 'MWI', 'Malawienne', 'Malawian'),
(94, 'Maldives', 'MDV', 'Maldivienne', 'Maldivian'),
(95, 'Mali', 'MLI', 'Malienne', 'Malian'),
(96, 'Malte', 'MLT', 'Maltaise', 'Maltese'),
(97, 'Maroc', 'MAR', 'Marocaine', 'Moroccan'),
(98, 'Maurice', 'MUS', 'Mauricienne', 'Mauritian'),
(99, 'Mauritanie', 'MRT', 'Mauritanienne', 'Mauritanian'),
(100, 'Mexique', 'MEX', 'Mexicaine', 'Mexican'),
(101, 'Moldavie', 'MDA', 'Moldave', 'Moldovan'),
(102, 'Monaco', 'MCO', 'Monégasque', 'Monegasque'),
(103, 'Mongolie', 'MNG', 'Mongole', 'Mongolian'),
(104, 'Monténégro', 'MNE', 'Monténégrine', 'Montenegrin'),
(105, 'Mozambique', 'MOZ', 'Mozambicaine', 'Mozambican'),
(106, 'Myanmar', 'MMR', 'Birmane', 'Burmese'),
(107, 'Namibie', 'NAM', 'Namibienne', 'Namibian'),
(108, 'Népal', 'NPL', 'Népalaise', 'Nepalese'),
(109, 'Nicaragua', 'NIC', 'Nicaraguayenne', 'Nicaraguan'),
(110, 'Niger', 'NER', 'Nigérienne', 'Nigerien'),
(111, 'Nigeria', 'NGA', 'Nigériane', 'Nigerian'),
(112, 'Norvège', 'NOR', 'Norvégienne', 'Norwegian'),
(113, 'Nouvelle-Zélande', 'NZL', 'Néo-zélandaise', 'New Zealander'),
(114, 'Oman', 'OMN', 'Omanaise', 'Omani'),
(115, 'Ouganda', 'UGA', 'Ougandaise', 'Ugandan'),
(116, 'Ouzbékistan', 'UZB', 'Ouzbèke', 'Uzbek'),
(117, 'Pakistan', 'PAK', 'Pakistanaise', 'Pakistani'),
(118, 'Panama', 'PAN', 'Panaméenne', 'Panamanian'),
(119, 'Paraguay', 'PRY', 'Paraguayenne', 'Paraguayan'),
(120, 'Pays-Bas', 'NLD', 'Néerlandaise', 'Dutch'),
(121, 'Pérou', 'PER', 'Péruvienne', 'Peruvian'),
(122, 'Philippines', 'PHL', 'Philippine', 'Filipino'),
(123, 'Pologne', 'POL', 'Polonaise', 'Polish'),
(124, 'Portugal', 'PRT', 'Portugaise', 'Portuguese'),
(125, 'Qatar', 'QAT', 'Qatarienne', 'Qatari'),
(126, 'République centrafricaine', 'CAF', 'Centrafricaine', 'Central African'),
(127, 'République démocratique du Congo', 'COD', 'Congolaise (RDC)', 'Congolese (DRC)'),
(128, 'République dominicaine', 'DOM', 'Dominicaine', 'Dominican'),
(129, 'Roumanie', 'ROU', 'Roumaine', 'Romanian'),
(130, 'Royaume-Uni', 'GBR', 'Britannique', 'British'),
(131, 'Russie', 'RUS', 'Russe', 'Russian'),
(132, 'Rwanda', 'RWA', 'Rwandaise', 'Rwandan'),
(133, 'Sénégal', 'SEN', 'Sénégalaise', 'Senegalese'),
(134, 'Serbie', 'SRB', 'Serbe', 'Serbian'),
(135, 'Seychelles', 'SYC', 'Seychelloise', 'Seychellois'),
(136, 'Sierra Leone', 'SLE', 'Sierra-léonaise', 'Sierra Leonean'),
(137, 'Singapour', 'SGP', 'Singapourienne', 'Singaporean'),
(138, 'Slovaquie', 'SVK', 'Slovaque', 'Slovak'),
(139, 'Slovénie', 'SVN', 'Slovène', 'Slovenian'),
(140, 'Somalie', 'SOM', 'Somalienne', 'Somali'),
(141, 'Soudan', 'SDN', 'Soudanaise', 'Sudanese'),
(142, 'Soudan du Sud', 'SSD', 'Sud-soudanaise', 'South Sudanese'),
(143, 'Sri Lanka', 'LKA', 'Sri-lankaise', 'Sri Lankan'),
(144, 'Suède', 'SWE', 'Suédoise', 'Swedish'),
(145, 'Suisse', 'CHE', 'Suisse', 'Swiss'),
(146, 'Suriname', 'SUR', 'Surinamaise', 'Surinamese'),
(147, 'Syrie', 'SYR', 'Syrienne', 'Syrian'),
(148, 'Tadjikistan', 'TJK', 'Tadjike', 'Tajik'),
(149, 'Tanzanie', 'TZA', 'Tanzanienne', 'Tanzanian'),
(150, 'Tchad', 'TCD', 'Tchadienne', 'Chadian'),
(151, 'Tchéquie', 'CZE', 'Tchèque', 'Czech'),
(152, 'Thaïlande', 'THA', 'Thaïlandaise', 'Thai'),
(153, 'Timor oriental', 'TLS', 'Est-timoraise', 'East Timorese'),
(154, 'Togo', 'TGO', 'Togolaise', 'Togolese'),
(155, 'Trinité-et-Tobago', 'TTO', 'Trinidadienne', 'Trinidadian'),
(156, 'Tunisie', 'TUN', 'Tunisienne', 'Tunisian'),
(157, 'Turquie', 'TUR', 'Turque', 'Turkish'),
(158, 'Ukraine', 'UKR', 'Ukrainienne', 'Ukrainian'),
(159, 'Uruguay', 'URY', 'Uruguayenne', 'Uruguayan'),
(160, 'Vanuatu', 'VUT', 'Vanuataise', 'Ni-Vanuatu'),
(161, 'Venezuela', 'VEN', 'Vénézuélienne', 'Venezuelan'),
(162, 'Vietnam', 'VNM', 'Vietnamienne', 'Vietnamese'),
(163, 'Yémen', 'YEM', 'Yéménite', 'Yemeni'),
(164, 'Zambie', 'ZMB', 'Zambienne', 'Zambian'),
(165, 'Zimbabwe', 'ZWE', 'Zimbabwéenne', 'Zimbabwean');

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

CREATE TABLE `personnel` (
  `id` int(11) NOT NULL,
  `matricule` varchar(191) NOT NULL,
  `prenom_personnel` varchar(191) NOT NULL,
  `nom_personnel` varchar(191) NOT NULL,
  `adresse_personnel` varchar(191) NOT NULL,
  `contact_personnel` varchar(191) NOT NULL,
  `image_personnel` varchar(191) DEFAULT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`id`, `matricule`, `prenom_personnel`, `nom_personnel`, `adresse_personnel`, `contact_personnel`, `image_personnel`, `service_id`) VALUES
(1, 'MAT001', 'Abdoulaye', 'Diallo', 'Dakar', '774444444', 'image.jpg', 1),
(2, 'MAT002', 'Mame Semou', 'DIOUF', 'Dakar', '774444444', 'image.jpg', 1),
(4, 'MAT003 mm', 'Sidy Ahmeth MM', 'CAMARA MM', 'Dakar MM', '773333333 MM', 'image.jpg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `regime`
--

CREATE TABLE `regime` (
  `id` int(11) NOT NULL,
  `nomRegime` varchar(191) NOT NULL,
  `descRegime` varchar(191) NOT NULL,
  `objetRegime` longtext NOT NULL,
  `documentId` int(11) NOT NULL,
  `categorieId` int(11) NOT NULL,
  `nationaliteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `regime`
--

INSERT INTO `regime` (`id`, `nomRegime`, `descRegime`, `objetRegime`, `documentId`, `categorieId`, `nationaliteId`) VALUES
(1, 'Exemption Visa CEDEAO', 'Libre circulation', 'Les ressortissants CEDEAO sont exemptés.', 2, 1, 1),
(2, 'Visa obligatoire USA', 'Visa requis', 'Visa obligatoire avant entrée.', 2, 2, 50);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nomRole` varchar(191) NOT NULL,
  `descRole` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nomRole`, `descRole`) VALUES
(1, 'ADMIN', 'Administrateur du système'),
(2, 'SUPERVISEUR', 'Superviseur opérationnel'),
(3, 'USER', 'Utilisateur standard'),
(5, 'ROLE 5 mm', 'Role 5 mm');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `nomService` varchar(191) NOT NULL,
  `sigleService` varchar(191) NOT NULL,
  `descService` varchar(191) NOT NULL,
  `contactService` varchar(191) DEFAULT NULL,
  `adresseService` varchar(191) DEFAULT NULL,
  `statutChefService` varchar(191) NOT NULL,
  `nomChefService` varchar(191) NOT NULL,
  `gradeChefService` varchar(191) NOT NULL,
  `fonctionChefService` varchar(191) NOT NULL,
  `contactChefService` varchar(191) NOT NULL,
  `serviceParentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `nomService`, `sigleService`, `descService`, `contactService`, `adresseService`, `statutChefService`, `nomChefService`, `gradeChefService`, `fonctionChefService`, `contactChefService`, `serviceParentId`) VALUES
(1, 'Service Informatique', 'SI', 'Gestion IT', '772222222', 'Dakar', 'Mr', 'Ba', 'Commandant', 'Chef IT', '773333333', 1);

-- --------------------------------------------------------

--
-- Structure de la table `serviceparent`
--

CREATE TABLE `serviceparent` (
  `id` int(11) NOT NULL,
  `nomServiceParent` varchar(191) NOT NULL,
  `sigleServiceParent` varchar(191) NOT NULL,
  `descServiceParent` varchar(191) NOT NULL,
  `contactServiceParent` varchar(191) DEFAULT NULL,
  `adresseServiceParent` varchar(191) DEFAULT NULL,
  `statutChefServiceParent` varchar(191) NOT NULL,
  `nomChefServiceParent` varchar(191) NOT NULL,
  `gradeChefServiceParent` varchar(191) NOT NULL,
  `fonctionChefServiceParent` varchar(191) NOT NULL,
  `contactChefServiceParent` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `serviceparent`
--

INSERT INTO `serviceparent` (`id`, `nomServiceParent`, `sigleServiceParent`, `descServiceParent`, `contactServiceParent`, `adresseServiceParent`, `statutChefServiceParent`, `nomChefServiceParent`, `gradeChefServiceParent`, `fonctionChefServiceParent`, `contactChefServiceParent`) VALUES
(1, 'Direction Générale', 'DG', 'Administration centrale', NULL, NULL, 'Mr', 'Amadou Diop', 'Inspecteur Principal', 'Directeur Général', '770000001'),
(2, 'Direction Générale MM', 'DG MM', 'Service central MM', '770000000 MM', 'Dakar MM', 'Mr', 'Diallo MM', 'Colonel MM', 'Directeur MM', '771111111 MM');

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
('7cf2a34f-4942-4f51-a5ae-9e78cb3ba9f9', 'b1f98fd146842dff7ff56bc50ce2b902a6153e8fe1352c17c9cf9c7f7723c9af', '2026-02-24 00:57:33.287', '20260224005732_init', NULL, NULL, '2026-02-24 00:57:32.475', 1),
('89693373-7df2-4d5e-8053-13b8bb3a9322', '688c53032c8f9829560dd4afcd60f9151ede300c61b36cd0a8d06024cd38d666', '2026-02-22 22:42:02.340', '20260222224201_init', NULL, NULL, '2026-02-22 22:42:01.985', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Categorie_nomCategorie_key` (`nomCategorie`);

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Document_nomDocument_key` (`nomDocument`),
  ADD UNIQUE KEY `Document_sigleDocument_key` (`sigleDocument`);

--
-- Index pour la table `nationalite`
--
ALTER TABLE `nationalite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Nationalite_nomPays_key` (`nomPays`),
  ADD UNIQUE KEY `Nationalite_codePays_key` (`codePays`);

--
-- Index pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Personnel_matricule_key` (`matricule`),
  ADD KEY `Personnel_service_id_fkey` (`service_id`);

--
-- Index pour la table `regime`
--
ALTER TABLE `regime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Regime_documentId_fkey` (`documentId`),
  ADD KEY `Regime_categorieId_fkey` (`categorieId`),
  ADD KEY `Regime_nationaliteId_fkey` (`nationaliteId`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_serviceParentId_fkey` (`serviceParentId`);

--
-- Index pour la table `serviceparent`
--
ALTER TABLE `serviceparent`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `nationalite`
--
ALTER TABLE `nationalite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `regime`
--
ALTER TABLE `regime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `serviceparent`
--
ALTER TABLE `serviceparent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `Personnel_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `regime`
--
ALTER TABLE `regime`
  ADD CONSTRAINT `Regime_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Regime_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Regime_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `nationalite` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `Service_serviceParentId_fkey` FOREIGN KEY (`serviceParentId`) REFERENCES `serviceparent` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
