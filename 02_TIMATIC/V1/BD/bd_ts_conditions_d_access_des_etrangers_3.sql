-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 fév. 2026 à 19:30
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
-- Base de données : `bd_ts_conditions_d_access_des_etrangers_3`
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
(2, 'CATEGORIE 2', 'Visa sans consultation prÃ©alable'),
(3, 'CATEGORIE 3', 'Visa avec consultation prÃ©alable obligatoire'),
(10, 'CAATEGORIE 4', 'CatÃ©gorie 4 mm');

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
(1, 'Afghanistan', 'AFG', 'Afghane', 'Afghan'),
(2, 'Afrique du Sud', 'ZAF', 'Sud-africaine', 'South African'),
(3, 'Albanie', 'ALB', 'Albanaise', 'Albanian'),
(4, 'Algérie', 'DZA', 'Algérienne', 'Algerian'),
(5, 'Allemagne', 'DEU', 'Allemande', 'German'),
(6, 'Andorre', 'AND', 'Andorrane', 'Andorran'),
(7, 'Angola', 'AGO', 'Angolaise', 'Angolan'),
(8, 'Arabie Saoudite', 'SAU', 'Saoudienne', 'Saudi'),
(9, 'Argentine', 'ARG', 'Argentine', 'Argentinian'),
(10, 'Arménie', 'ARM', 'Arménienne', 'Armenian'),
(11, 'Australie', 'AUS', 'Australienne', 'Australian'),
(12, 'Autriche', 'AUT', 'Autrichienne', 'Austrian'),
(13, 'Azerbaïdjan', 'AZE', 'Azerbaïdjanaise', 'Azerbaijani'),
(14, 'Bahamas', 'BHS', 'Bahaméenne', 'Bahamian'),
(15, 'Bahreïn', 'BHR', 'Bahreïnienne', 'Bahraini'),
(16, 'Bangladesh', 'BGD', 'Bangladaise', 'Bangladeshi'),
(17, 'Belgique', 'BEL', 'Belge', 'Belgian'),
(18, 'Bénin', 'BEN', 'Béninoise', 'Beninese'),
(19, 'Bhoutan', 'BTN', 'Bhoutanaise', 'Bhutanese'),
(20, 'Bolivie', 'BOL', 'Bolivienne', 'Bolivian'),
(21, 'Bosnie-Herzégovine', 'BIH', 'Bosnienne', 'Bosnian'),
(22, 'Botswana', 'BWA', 'Botswanaise', 'Botswanan'),
(23, 'Brésil', 'BRA', 'Brésilienne', 'Brazilian'),
(24, 'Brunei', 'BRN', 'Brunéienne', 'Bruneian'),
(25, 'Bulgarie', 'BGR', 'Bulgare', 'Bulgarian'),
(26, 'Burkina Faso', 'BFA', 'Burkinabè', 'Burkinabe'),
(27, 'Burundi', 'BDI', 'Burundaise', 'Burundian'),
(28, 'Cambodge', 'KHM', 'Cambodgienne', 'Cambodian'),
(29, 'Cameroun', 'CMR', 'Camerounaise', 'Cameroonian'),
(30, 'Canada', 'CAN', 'Canadienne', 'Canadian'),
(31, 'Cap-Vert', 'CPV', 'Cap-verdienne', 'Cape Verdean'),
(32, 'Chili', 'CHL', 'Chilienne', 'Chilean'),
(33, 'Chine', 'CHN', 'Chinoise', 'Chinese'),
(34, 'Chypre', 'CYP', 'Chypriote', 'Cypriot'),
(35, 'Colombie', 'COL', 'Colombienne', 'Colombian'),
(36, 'Comores', 'COM', 'Comorienne', 'Comorian'),
(37, 'Congo', 'COG', 'Congolaise', 'Congolese'),
(38, 'Corée du Sud', 'KOR', 'Sud-coréenne', 'South Korean'),
(39, 'Corée du Nord', 'PRK', 'Nord-coréenne', 'North Korean'),
(40, 'Costa Rica', 'CRI', 'Costaricienne', 'Costa Rican'),
(41, 'Côte d’Ivoire', 'CIV', 'Ivoirienne', 'Ivorian'),
(42, 'Croatie', 'HRV', 'Croate', 'Croatian'),
(43, 'Cuba', 'CUB', 'Cubaine', 'Cuban'),
(44, 'Danemark', 'DNK', 'Danoise', 'Danish'),
(45, 'Djibouti', 'DJI', 'Djiboutienne', 'Djiboutian'),
(46, 'Égypte', 'EGY', 'Égyptienne', 'Egyptian'),
(47, 'Émirats arabes unis', 'ARE', 'Émirienne', 'Emirati'),
(48, 'Équateur', 'ECU', 'Équatorienne', 'Ecuadorian'),
(49, 'Espagne', 'ESP', 'Espagnole', 'Spanish'),
(50, 'Estonie', 'EST', 'Estonienne', 'Estonian'),
(51, 'Eswatini', 'SWZ', 'Swazie', 'Swazi'),
(52, 'États-Unis', 'USA', 'Américaine', 'American'),
(53, 'Éthiopie', 'ETH', 'Éthiopienne', 'Ethiopian'),
(54, 'Fidji', 'FJI', 'Fidjienne', 'Fijian'),
(55, 'Finlande', 'FIN', 'Finlandaise', 'Finnish'),
(56, 'France', 'FRA', 'Française', 'French'),
(57, 'Gabon', 'GAB', 'Gabonaise', 'Gabonese'),
(58, 'Gambie', 'GMB', 'Gambienne', 'Gambian'),
(59, 'Ghana', 'GHA', 'Ghanéenne', 'Ghanaian'),
(60, 'Grèce', 'GRC', 'Grecque', 'Greek'),
(61, 'Guinée', 'GIN', 'Guinéenne', 'Guinean'),
(62, 'Guinée-Bissau', 'GNB', 'Bissau-guinéenne', 'Bissau-Guinean'),
(63, 'Guinée équatoriale', 'GNQ', 'Équato-guinéenne', 'Equatorial Guinean'),
(64, 'Haïti', 'HTI', 'Haïtienne', 'Haitian'),
(65, 'Honduras', 'HND', 'Hondurienne', 'Honduran'),
(66, 'Hongrie', 'HUN', 'Hongroise', 'Hungarian'),
(67, 'Inde', 'IND', 'Indienne', 'Indian'),
(68, 'Indonésie', 'IDN', 'Indonésienne', 'Indonesian'),
(69, 'Irak', 'IRQ', 'Irakienne', 'Iraqi'),
(70, 'Iran', 'IRN', 'Iranienne', 'Iranian'),
(71, 'Irlande', 'IRL', 'Irlandaise', 'Irish'),
(72, 'Islande', 'ISL', 'Islandaise', 'Icelandic'),
(73, 'Israël', 'ISR', 'Israélienne', 'Israeli'),
(74, 'Italie', 'ITA', 'Italienne', 'Italian'),
(75, 'Jamaïque', 'JAM', 'Jamaïcaine', 'Jamaican'),
(76, 'Japon', 'JPN', 'Japonaise', 'Japanese'),
(77, 'Jordanie', 'JOR', 'Jordanienne', 'Jordanian'),
(78, 'Kazakhstan', 'KAZ', 'Kazakhstanaise', 'Kazakh'),
(79, 'Kenya', 'KEN', 'Kényane', 'Kenyan'),
(80, 'Kirghizistan', 'KGZ', 'Kirghize', 'Kyrgyz'),
(81, 'Koweït', 'KWT', 'Koweïtienne', 'Kuwaiti'),
(82, 'Laos', 'LAO', 'Laotienne', 'Lao'),
(83, 'Lesotho', 'LSO', 'Lesothane', 'Lesotho'),
(84, 'Lettonie', 'LVA', 'Lettonne', 'Latvian'),
(85, 'Liban', 'LBN', 'Libanaise', 'Lebanese'),
(86, 'Liberia', 'LBR', 'Libérienne', 'Liberian'),
(87, 'Libye', 'LBY', 'Libyenne', 'Libyan'),
(88, 'Lituanie', 'LTU', 'Lituanienne', 'Lithuanian'),
(89, 'Luxembourg', 'LUX', 'Luxembourgeoise', 'Luxembourgish'),
(90, 'Madagascar', 'MDG', 'Malgache', 'Malagasy'),
(91, 'Malaisie', 'MYS', 'Malaisienne', 'Malaysian'),
(92, 'Malawi', 'MWI', 'Malawienne', 'Malawian'),
(93, 'Maldives', 'MDV', 'Maldivienne', 'Maldivian'),
(94, 'Mali', 'MLI', 'Malienne', 'Malian'),
(95, 'Malte', 'MLT', 'Maltaise', 'Maltese'),
(96, 'Maroc', 'MAR', 'Marocaine', 'Moroccan'),
(97, 'Maurice', 'MUS', 'Mauricienne', 'Mauritian'),
(98, 'Mauritanie', 'MRT', 'Mauritanienne', 'Mauritanian'),
(99, 'Mexique', 'MEX', 'Mexicaine', 'Mexican'),
(100, 'Moldavie', 'MDA', 'Moldave', 'Moldovan'),
(101, 'Monaco', 'MCO', 'Monégasque', 'Monegasque'),
(102, 'Mongolie', 'MNG', 'Mongole', 'Mongolian'),
(103, 'Monténégro', 'MNE', 'Monténégrine', 'Montenegrin'),
(104, 'Mozambique', 'MOZ', 'Mozambicaine', 'Mozambican'),
(105, 'Myanmar', 'MMR', 'Birmane', 'Burmese'),
(106, 'Namibie', 'NAM', 'Namibienne', 'Namibian'),
(107, 'Népal', 'NPL', 'Népalaise', 'Nepalese'),
(108, 'Nicaragua', 'NIC', 'Nicaraguayenne', 'Nicaraguan'),
(109, 'Niger', 'NER', 'Nigérienne', 'Nigerien'),
(110, 'Nigeria', 'NGA', 'Nigériane', 'Nigerian'),
(111, 'Norvège', 'NOR', 'Norvégienne', 'Norwegian'),
(112, 'Nouvelle-Zélande', 'NZL', 'Néo-zélandaise', 'New Zealander'),
(113, 'Oman', 'OMN', 'Omanaise', 'Omani'),
(114, 'Ouganda', 'UGA', 'Ougandaise', 'Ugandan'),
(115, 'Ouzbékistan', 'UZB', 'Ouzbèke', 'Uzbek'),
(116, 'Pakistan', 'PAK', 'Pakistanaise', 'Pakistani'),
(117, 'Panama', 'PAN', 'Panaméenne', 'Panamanian'),
(118, 'Paraguay', 'PRY', 'Paraguayenne', 'Paraguayan'),
(119, 'Pays-Bas', 'NLD', 'Néerlandaise', 'Dutch'),
(120, 'Pérou', 'PER', 'Péruvienne', 'Peruvian'),
(121, 'Philippines', 'PHL', 'Philippine', 'Filipino'),
(122, 'Pologne', 'POL', 'Polonaise', 'Polish'),
(123, 'Portugal', 'PRT', 'Portugaise', 'Portuguese'),
(124, 'Qatar', 'QAT', 'Qatarienne', 'Qatari'),
(125, 'République centrafricaine', 'CAF', 'Centrafricaine', 'Central African'),
(126, 'République démocratique du Congo', 'COD', 'Congolaise (RDC)', 'Congolese (DRC)'),
(127, 'République dominicaine', 'DOM', 'Dominicaine', 'Dominican'),
(128, 'Roumanie', 'ROU', 'Roumaine', 'Romanian'),
(129, 'Royaume-Uni', 'GBR', 'Britannique', 'British'),
(130, 'Russie', 'RUS', 'Russe', 'Russian'),
(131, 'Rwanda', 'RWA', 'Rwandaise', 'Rwandan'),
(132, 'Sénégal', 'SEN', 'Sénégalaise', 'Senegalese'),
(133, 'Serbie', 'SRB', 'Serbe', 'Serbian'),
(134, 'Seychelles', 'SYC', 'Seychelloise', 'Seychellois'),
(135, 'Sierra Leone', 'SLE', 'Sierra-léonaise', 'Sierra Leonean'),
(136, 'Singapour', 'SGP', 'Singapourienne', 'Singaporean'),
(137, 'Slovaquie', 'SVK', 'Slovaque', 'Slovak'),
(138, 'Slovénie', 'SVN', 'Slovène', 'Slovenian'),
(139, 'Somalie', 'SOM', 'Somalienne', 'Somali'),
(140, 'Soudan', 'SDN', 'Soudanaise', 'Sudanese'),
(141, 'Soudan du Sud', 'SSD', 'Sud-soudanaise', 'South Sudanese'),
(142, 'Sri Lanka', 'LKA', 'Sri-lankaise', 'Sri Lankan'),
(143, 'Suède', 'SWE', 'Suédoise', 'Swedish'),
(144, 'Suisse', 'CHE', 'Suisse', 'Swiss'),
(145, 'Suriname', 'SUR', 'Surinamaise', 'Surinamese'),
(146, 'Syrie', 'SYR', 'Syrienne', 'Syrian'),
(147, 'Tadjikistan', 'TJK', 'Tadjike', 'Tajik'),
(148, 'Tanzanie', 'TZA', 'Tanzanienne', 'Tanzanian'),
(149, 'Tchad', 'TCD', 'Tchadienne', 'Chadian'),
(150, 'Tchéquie', 'CZE', 'Tchèque', 'Czech'),
(151, 'Thaïlande', 'THA', 'Thaïlandaise', 'Thai'),
(152, 'Timor oriental', 'TLS', 'Est-timoraise', 'East Timorese'),
(153, 'Togo', 'TGO', 'Togolaise', 'Togolese'),
(154, 'Trinité-et-Tobago', 'TTO', 'Trinidadienne', 'Trinidadian'),
(155, 'Tunisie', 'TUN', 'Tunisienne', 'Tunisian'),
(156, 'Turquie', 'TUR', 'Turque', 'Turkish'),
(157, 'Ukraine', 'UKR', 'Ukrainienne', 'Ukrainian'),
(158, 'Uruguay', 'URY', 'Uruguayenne', 'Uruguayan'),
(159, 'Vanuatu', 'VUT', 'Vanuataise', 'Ni-Vanuatu'),
(160, 'Venezuela', 'VEN', 'Vénézuélienne', 'Venezuelan'),
(161, 'Vietnam', 'VNM', 'Vietnamienne', 'Vietnamese'),
(162, 'Yémen', 'YEM', 'Yéménite', 'Yemeni'),
(163, 'Zambie', 'ZMB', 'Zambienne', 'Zambian'),
(164, 'Zimbabwe', 'ZWE', 'Zimbabwéenne', 'Zimbabwean');

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

-- --------------------------------------------------------

--
-- Structure de la table `regime`
--

CREATE TABLE `regime` (
  `id` int(11) NOT NULL,
  `nomRegime` varchar(191) NOT NULL,
  `descRegime` varchar(191) NOT NULL,
  `objetRegime` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `regime`
--

INSERT INTO `regime` (`id`, `nomRegime`, `descRegime`, `objetRegime`) VALUES
(1, 'Dispense de visa', 'Non soumis au visa', 'Le titulaire de ce document n\'est pas soumis au visa. \nIl est admins a pénétrer sur le territoire sénégalais sur présentation:\n - d\'un passeport en cours de validité,\n - d\'une garantie de rapatriement, d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure du Sénégal,\n - d\'un certificat international de vaccination exigé par les règlements sanitaires');

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
(1, 'ADMIN', 'Administrateur du systÃ¨me'),
(2, 'SUPERVISEUR', 'Superviseur opÃ©rationnel'),
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
(1, 'Direction GÃ©nÃ©rale', 'DG', 'Administration centrale', NULL, NULL, 'Mr', 'Amadou Diop', 'Inspecteur Principal', 'Directeur GÃ©nÃ©ral', '770000001'),
(2, 'Direction GÃ©nÃ©rale MM', 'DG MM', 'Service central MM', '770000000 MM', 'Dakar MM', 'Mr', 'Diallo MM', 'Colonel MM', 'Directeur MM', '771111111 MM');

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
('0d776e0d-e238-4425-b61a-3f4e45c53262', 'e07bb148c7b2ee5c2d00fe599a4596c762e832d427144fbda57c502d94706c62', '2026-02-25 00:01:47.428', '20260225000147_regime_full_m2m', NULL, NULL, '2026-02-25 00:01:47.219', 1),
('23415563-0504-479e-b487-b5ff4894f8f0', '04733c1193097936a3f7c015c768b60306a60da2930301a2bb894a98977499e4', '2026-02-25 00:01:44.413', '20260224231951_update_regime_m2m', NULL, NULL, '2026-02-25 00:01:43.967', 1),
('5ffd4c35-6ae1-4548-bc01-3836e400f2c0', '688c53032c8f9829560dd4afcd60f9151ede300c61b36cd0a8d06024cd38d666', '2026-02-25 00:01:43.654', '20260222224201_init', NULL, NULL, '2026-02-25 00:01:42.560', 1),
('8c7a091c-83c2-4a95-82cc-c5e4b4a5ec25', 'b1f98fd146842dff7ff56bc50ce2b902a6153e8fe1352c17c9cf9c7f7723c9af', '2026-02-25 00:01:43.964', '20260224005732_init', NULL, NULL, '2026-02-25 00:01:43.657', 1);

-- --------------------------------------------------------

--
-- Structure de la table `_regimecategories`
--

CREATE TABLE `_regimecategories` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_regimecategories`
--

INSERT INTO `_regimecategories` (`A`, `B`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `_regimedocuments`
--

CREATE TABLE `_regimedocuments` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_regimedocuments`
--

INSERT INTO `_regimedocuments` (`A`, `B`) VALUES
(1, 1),
(2, 1),
(3, 1),
(10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `_regimenationalites`
--

CREATE TABLE `_regimenationalites` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_regimenationalites`
--

INSERT INTO `_regimenationalites` (`A`, `B`) VALUES
(18, 1),
(26, 1),
(41, 1),
(58, 1),
(59, 1),
(61, 1),
(62, 1),
(94, 1),
(109, 1),
(110, 1);

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
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `_regimecategories`
--
ALTER TABLE `_regimecategories`
  ADD UNIQUE KEY `_RegimeCategories_AB_unique` (`A`,`B`),
  ADD KEY `_RegimeCategories_B_index` (`B`);

--
-- Index pour la table `_regimedocuments`
--
ALTER TABLE `_regimedocuments`
  ADD UNIQUE KEY `_RegimeDocuments_AB_unique` (`A`,`B`),
  ADD KEY `_RegimeDocuments_B_index` (`B`);

--
-- Index pour la table `_regimenationalites`
--
ALTER TABLE `_regimenationalites`
  ADD UNIQUE KEY `_RegimeNationalites_AB_unique` (`A`,`B`),
  ADD KEY `_RegimeNationalites_B_index` (`B`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `regime`
--
ALTER TABLE `regime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `Service_serviceParentId_fkey` FOREIGN KEY (`serviceParentId`) REFERENCES `serviceparent` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `_regimecategories`
--
ALTER TABLE `_regimecategories`
  ADD CONSTRAINT `_RegimeCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_RegimeCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `regime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `_regimedocuments`
--
ALTER TABLE `_regimedocuments`
  ADD CONSTRAINT `_RegimeDocuments_A_fkey` FOREIGN KEY (`A`) REFERENCES `document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_RegimeDocuments_B_fkey` FOREIGN KEY (`B`) REFERENCES `regime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `_regimenationalites`
--
ALTER TABLE `_regimenationalites`
  ADD CONSTRAINT `_RegimeNationalites_A_fkey` FOREIGN KEY (`A`) REFERENCES `nationalite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_RegimeNationalites_B_fkey` FOREIGN KEY (`B`) REFERENCES `regime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
