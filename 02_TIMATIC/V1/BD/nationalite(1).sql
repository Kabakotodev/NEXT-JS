-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 fév. 2026 à 01:05
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

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `nationalite`
--
ALTER TABLE `nationalite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Nationalite_nomPays_key` (`nomPays`),
  ADD UNIQUE KEY `Nationalite_codePays_key` (`codePays`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `nationalite`
--
ALTER TABLE `nationalite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
