-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 fév. 2026 à 03:03
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
-- Base de données : `bd_ts_conditions_d_access_des_etrangers_4`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nomCategorie` varchar(191) NOT NULL,
  `descCategorie` varchar(191) NOT NULL,
  `objetCategorie` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nomCategorie`, `descCategorie`, `objetCategorie`) VALUES
(1, 'CATEGORIE A : Pays membres de la CEDEAO', 'Dispense de visa', '<p>Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admins à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité ou d\'une carte d\'identité nationale biométrique CEDEAO ou d\'un laissez-passez;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;<br><br></p>'),
(2, 'CATEGORIE A : Mauritanie', 'Dispense de visa', '<p>Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admins à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité ou d\'une carte d\'identité nationale biométrique;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;<br><br></p>'),
(3, 'CATEGORIE A : Djibouti et Rwanda', 'Dispense de visa', '<p>Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admins à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;</p>'),
(4, 'CATEGORIE A : Tous les PP des Pays de l\'UE', 'Dispense de visa', 'Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admins à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure au Sénégal;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;'),
(5, 'CATEGORIE A : PD', 'Dispense de visa', '<p>Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admins à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure au Sénégal;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;</p>'),
(14, 'CATEGORIE A : Tous les PP d\'autres pays', 'Dispense de visa', 'Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admin à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure au Sénégal;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;'),
(30, 'CATEGORIE A : PD et PS', 'Dispense de visa', '<p>Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admin à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination exterieure au Sénégal;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;</p>'),
(33, 'CATEGORIE A : Tous les PP des pays de la zone Amerique et Asie', 'Dispense de visa', 'Le titulaire de ce document <span style=\"background-color: rgb(255, 255, 0);\">n\'est pas soumis au visa</span>.&nbsp;<br>Il est admin à pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport en cours de validité;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure au Sénégal;<br>&nbsp;- d\'un certificat international de vaccination exigé par les règlements sanitaires;'),
(34, 'CATEGORIE B', 'Document soumis à un visa gratuit à l\'arrivée, sans consultation préalable ', '<p>Le titulaire de ce document de voyage est<b>&nbsp;<span style=\"background-color: rgb(255, 255, 0);\">soumis à un visa gratuit à l\'arrivée</span></b>, sans consultation préalable<b>&nbsp;</b><br>Il est admis à&nbsp; pénétrer sur le territoire sénégalais sur présentation:<br>&nbsp;- d\'un passeport d\'une validité d\'au moins 6 mois,<br>&nbsp;- d\'un visa d\'entrée gratuit ou d\'une carte d\'identité pour étranger. A défaut de cela, un visa gratuit, sans consultation préalable lui sera apposé, au point d\'entrée;<br>&nbsp;- d\'une garantie de rapatriement ou d\'un billet aller-retour ou d\'un titre de voyage pour une destination extérieure au Sénégal,<br>&nbsp;- d\'un certification international de vaccination exigé par les règlements sanitaires</p>');

-- --------------------------------------------------------

--
-- Structure de la table `categorierelation`
--

CREATE TABLE `categorierelation` (
  `id` int(11) NOT NULL,
  `categorieId` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  `nationaliteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorierelation`
--

INSERT INTO `categorierelation` (`id`, `categorieId`, `documentId`, `nationaliteId`) VALUES
(1002, 1, 1, 27),
(1003, 1, 1, 95),
(1004, 1, 1, 110),
(1005, 1, 1, 111),
(1006, 1, 1, 60),
(1007, 1, 1, 59),
(1008, 1, 1, 42),
(1009, 1, 1, 62),
(1010, 1, 1, 63),
(1011, 1, 1, 154),
(1012, 1, 1, 32),
(1013, 1, 1, 87),
(1014, 1, 1, 136),
(1015, 1, 2, 27),
(1016, 1, 2, 95),
(1017, 1, 2, 110),
(1018, 1, 2, 111),
(1019, 1, 2, 60),
(1020, 1, 2, 59),
(1021, 1, 2, 42),
(1022, 1, 2, 62),
(1023, 1, 2, 63),
(1024, 1, 2, 154),
(1025, 1, 2, 32),
(1026, 1, 2, 87),
(1027, 1, 2, 136),
(1028, 1, 3, 27),
(1029, 1, 3, 95),
(1030, 1, 3, 110),
(1031, 1, 3, 111),
(1032, 1, 3, 60),
(1033, 1, 3, 59),
(1034, 1, 3, 42),
(1035, 1, 3, 62),
(1036, 1, 3, 63),
(1037, 1, 3, 154),
(1038, 1, 3, 32),
(1039, 1, 3, 87),
(1040, 1, 3, 136),
(1041, 1, 4, 27),
(1042, 1, 4, 95),
(1043, 1, 4, 110),
(1044, 1, 4, 111),
(1045, 1, 4, 60),
(1046, 1, 4, 59),
(1047, 1, 4, 42),
(1048, 1, 4, 62),
(1049, 1, 4, 63),
(1050, 1, 4, 154),
(1051, 1, 4, 32),
(1052, 1, 4, 87),
(1053, 1, 4, 136),
(1054, 1, 6, 27),
(1055, 1, 6, 95),
(1056, 1, 6, 110),
(1057, 1, 6, 111),
(1058, 1, 6, 60),
(1059, 1, 6, 59),
(1060, 1, 6, 42),
(1061, 1, 6, 62),
(1062, 1, 6, 63),
(1063, 1, 6, 154),
(1064, 1, 6, 32),
(1065, 1, 6, 87),
(1066, 1, 6, 136),
(1067, 1, 10, 27),
(1068, 1, 10, 95),
(1069, 1, 10, 110),
(1070, 1, 10, 111),
(1071, 1, 10, 60),
(1072, 1, 10, 59),
(1073, 1, 10, 42),
(1074, 1, 10, 62),
(1075, 1, 10, 63),
(1076, 1, 10, 154),
(1077, 1, 10, 32),
(1078, 1, 10, 87),
(1079, 1, 10, 136),
(1080, 1, 11, 27),
(1081, 1, 11, 95),
(1082, 1, 11, 110),
(1083, 1, 11, 111),
(1084, 1, 11, 60),
(1085, 1, 11, 59),
(1086, 1, 11, 42),
(1087, 1, 11, 62),
(1088, 1, 11, 63),
(1089, 1, 11, 154),
(1090, 1, 11, 32),
(1091, 1, 11, 87),
(1092, 1, 11, 136),
(1105, 2, 1, 99),
(1106, 2, 2, 99),
(1107, 2, 3, 99),
(1108, 2, 7, 99),
(1109, 2, 4, 99),
(1110, 3, 1, 46),
(1111, 3, 1, 132),
(1112, 3, 2, 46),
(1113, 3, 2, 132),
(1114, 3, 3, 46),
(1115, 3, 3, 132),
(1116, 3, 4, 46),
(1117, 3, 4, 132),
(1974, 5, 2, 48),
(1975, 5, 2, 157),
(2282, 30, 2, 5),
(2283, 30, 2, 3),
(2284, 30, 2, 58),
(2285, 30, 2, 115),
(2286, 30, 3, 5),
(2287, 30, 3, 3),
(2288, 30, 3, 58),
(2289, 30, 3, 115),
(2322, 33, 1, 31),
(2323, 33, 1, 77),
(2324, 33, 1, 24),
(2325, 33, 1, 53),
(2326, 33, 1, 68),
(2327, 33, 2, 31),
(2328, 33, 2, 77),
(2329, 33, 2, 24),
(2330, 33, 2, 53),
(2331, 33, 2, 68),
(2332, 33, 3, 31),
(2333, 33, 3, 77),
(2334, 33, 3, 24),
(2335, 33, 3, 53),
(2336, 33, 3, 68),
(2337, 33, 4, 31),
(2338, 33, 4, 77),
(2339, 33, 4, 24),
(2340, 33, 4, 53),
(2341, 33, 4, 68),
(2537, 4, 3, 69),
(2538, 4, 3, 129),
(2539, 4, 3, 18),
(2540, 4, 3, 50),
(2541, 4, 3, 57),
(2542, 4, 3, 75),
(2543, 4, 3, 120),
(2544, 4, 3, 6),
(2545, 4, 3, 13),
(2546, 4, 3, 26),
(2547, 4, 3, 35),
(2548, 4, 3, 43),
(2549, 4, 3, 45),
(2550, 4, 3, 51),
(2551, 4, 3, 56),
(2552, 4, 3, 61),
(2553, 4, 3, 67),
(2554, 4, 3, 72),
(2555, 4, 3, 85),
(2556, 4, 3, 89),
(2557, 4, 3, 90),
(2558, 4, 3, 96),
(2559, 4, 3, 123),
(2560, 4, 3, 124),
(2561, 4, 3, 151),
(2562, 4, 3, 138),
(2563, 4, 3, 139),
(2564, 4, 3, 144),
(2565, 4, 2, 69),
(2566, 4, 2, 129),
(2567, 4, 2, 18),
(2568, 4, 2, 50),
(2569, 4, 2, 57),
(2570, 4, 2, 75),
(2571, 4, 2, 120),
(2572, 4, 2, 6),
(2573, 4, 2, 13),
(2574, 4, 2, 26),
(2575, 4, 2, 35),
(2576, 4, 2, 43),
(2577, 4, 2, 45),
(2578, 4, 2, 51),
(2579, 4, 2, 56),
(2580, 4, 2, 61),
(2581, 4, 2, 67),
(2582, 4, 2, 72),
(2583, 4, 2, 85),
(2584, 4, 2, 89),
(2585, 4, 2, 90),
(2586, 4, 2, 96),
(2587, 4, 2, 123),
(2588, 4, 2, 124),
(2589, 4, 2, 151),
(2590, 4, 2, 138),
(2591, 4, 2, 139),
(2592, 4, 2, 144),
(2593, 4, 1, 69),
(2594, 4, 1, 129),
(2595, 4, 1, 18),
(2596, 4, 1, 50),
(2597, 4, 1, 57),
(2598, 4, 1, 75),
(2599, 4, 1, 120),
(2600, 4, 1, 6),
(2601, 4, 1, 13),
(2602, 4, 1, 26),
(2603, 4, 1, 35),
(2604, 4, 1, 43),
(2605, 4, 1, 45),
(2606, 4, 1, 51),
(2607, 4, 1, 56),
(2608, 4, 1, 61),
(2609, 4, 1, 67),
(2610, 4, 1, 72),
(2611, 4, 1, 85),
(2612, 4, 1, 89),
(2613, 4, 1, 90),
(2614, 4, 1, 96),
(2615, 4, 1, 123),
(2616, 4, 1, 124),
(2617, 4, 1, 151),
(2618, 4, 1, 138),
(2619, 4, 1, 139),
(2620, 4, 1, 144),
(2621, 4, 4, 69),
(2622, 4, 4, 129),
(2623, 4, 4, 18),
(2624, 4, 4, 50),
(2625, 4, 4, 57),
(2626, 4, 4, 75),
(2627, 4, 4, 120),
(2628, 4, 4, 6),
(2629, 4, 4, 13),
(2630, 4, 4, 26),
(2631, 4, 4, 35),
(2632, 4, 4, 43),
(2633, 4, 4, 45),
(2634, 4, 4, 51),
(2635, 4, 4, 56),
(2636, 4, 4, 61),
(2637, 4, 4, 67),
(2638, 4, 4, 72),
(2639, 4, 4, 85),
(2640, 4, 4, 89),
(2641, 4, 4, 90),
(2642, 4, 4, 96),
(2643, 4, 4, 123),
(2644, 4, 4, 124),
(2645, 4, 4, 151),
(2646, 4, 4, 138),
(2647, 4, 4, 139),
(2648, 4, 4, 144),
(2827, 14, 1, 97),
(2828, 14, 1, 137),
(2829, 14, 1, 156),
(2830, 14, 1, 130),
(2831, 14, 1, 38),
(2832, 14, 2, 97),
(2833, 14, 2, 137),
(2834, 14, 2, 156),
(2835, 14, 2, 130),
(2836, 14, 2, 38),
(2837, 14, 3, 97),
(2838, 14, 3, 137),
(2839, 14, 3, 156),
(2840, 14, 3, 130),
(2841, 14, 3, 38),
(2842, 14, 4, 97),
(2843, 14, 4, 137),
(2844, 14, 4, 156),
(2845, 14, 4, 130),
(2846, 14, 4, 38),
(3178, 34, 1, 3),
(3179, 34, 1, 5),
(3180, 34, 1, 7),
(3181, 34, 1, 8),
(3182, 34, 1, 10),
(3183, 34, 1, 11),
(3184, 34, 1, 12),
(3185, 34, 1, 15),
(3186, 34, 1, 16),
(3187, 34, 1, 23),
(3188, 34, 1, 25),
(3189, 34, 1, 28),
(3190, 34, 1, 30),
(3191, 34, 1, 34),
(3192, 34, 1, 37),
(3193, 34, 1, 41),
(3194, 34, 1, 47),
(3195, 34, 1, 54),
(3196, 34, 1, 55),
(3197, 34, 1, 64),
(3198, 34, 1, 65),
(3199, 34, 1, 66),
(3200, 34, 1, 73),
(3201, 34, 1, 74),
(3202, 34, 1, 76),
(3203, 34, 1, 80),
(3204, 34, 1, 82),
(3205, 34, 1, 84),
(3206, 34, 1, 88),
(3207, 34, 1, 91),
(3208, 34, 1, 93),
(3209, 34, 1, 102),
(3210, 34, 1, 107),
(3211, 34, 1, 108),
(3212, 34, 1, 112),
(3213, 34, 1, 113),
(3214, 34, 1, 114),
(3215, 34, 1, 115),
(3216, 34, 1, 122),
(3217, 34, 1, 127),
(3218, 34, 1, 128),
(3219, 34, 1, 58),
(3220, 34, 1, 131),
(3221, 34, 1, 135),
(3222, 34, 1, 146),
(3223, 34, 1, 149),
(3224, 34, 1, 150),
(3225, 34, 1, 152),
(3226, 34, 1, 155),
(3227, 34, 1, 157),
(3228, 34, 1, 158),
(3229, 34, 1, 160),
(3230, 34, 1, 164),
(3231, 34, 1, 165);

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
(2, 'Passeport Diplomatique', 'P.D', 'Passeport diplomatique'),
(3, 'Passeport de Service', 'P.S', 'Passeport de service'),
(4, 'Passeport d\'Urgence', 'P.U', 'Passeport d\'urgence'),
(5, 'Passeport des Nations Unies', 'P O.N.U', 'Passeport des nations unies'),
(6, 'Carte d\'Identite CEDEAO', 'CNI CEDEAO', 'Carte d\'identite CEDEAO'),
(7, 'Carte d\'Identite Nationale', 'C.N.I', 'Carte d’identité Nationale'),
(8, 'Passeport Refugié ', 'P.R', 'Titre de voyage pour refugié'),
(9, 'Document de Voyage Enfant', 'D.C.E.M.E', 'Document de circulation pour enfant mineur étranger'),
(10, 'SAUF CONDUITE', 'SAUF CONDUITE', 'Sauf conduite'),
(11, 'LAISSEZ PASSER', 'LAISSEZ PASSER', 'Laissez passer CEDEAO');

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
(1, 'NON RENSEIGNE', 'NR', 'NON RENSEIGNE', 'NON RENSEIGNE'),
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
(1, 'ADMIN', 'Administrateur du systÃƒÂ¨me'),
(2, 'SUPERVISEUR', 'Superviseur opÃƒÂ©rationnel'),
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
(1, 'Direction GÃƒÂ©nÃƒÂ©rale', 'DG', 'Administration centrale', NULL, NULL, 'Mr', 'Amadou Diop', 'Inspecteur Principal', 'Directeur GÃƒÂ©nÃƒÂ©ral', '770000001'),
(2, 'Direction GÃƒÂ©nÃƒÂ©rale MM', 'DG MM', 'Service central MM', '770000000 MM', 'Dakar MM', 'Mr', 'Diallo MM', 'Colonel MM', 'Directeur MM', '771111111 MM');

-- --------------------------------------------------------

--
-- Structure de la table `visasearchlog`
--

CREATE TABLE `visasearchlog` (
  `id` int(11) NOT NULL,
  `nationaliteId` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  `resultFound` tinyint(1) NOT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `visasearchlog`
--

INSERT INTO `visasearchlog` (`id`, `nationaliteId`, `documentId`, `resultFound`, `ipAddress`, `userAgent`, `createdAt`) VALUES
(1, 8, 1, 1, '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', '2026-02-27 01:40:18.194'),
(2, 12, 1, 1, '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', '2026-02-27 01:57:54.799'),
(3, 12, 10, 0, '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', '2026-02-27 01:58:00.281');

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
('226a20f5-0f63-4d9f-9104-d3bd1f005c75', '5119980fe4b602f20d57469e92a90595af22443ae5ea95e708a4fc9ed3c4a133', '2026-02-25 18:48:58.918', '20260225184858_update_categorie_relation', NULL, NULL, '2026-02-25 18:48:58.585', 1),
('5db71fab-c245-474f-a33b-e9f170e57eb0', '04733c1193097936a3f7c015c768b60306a60da2930301a2bb894a98977499e4', '2026-02-25 18:48:54.687', '20260224231951_update_regime_m2m', NULL, NULL, '2026-02-25 18:48:54.057', 1),
('973a2cd8-c0cf-4c4c-9ddb-8a37e46bcb71', '0a497bd201f1ef876739ca35ba9ed12327cc40a3c6921181e89d08dc9667547c', '2026-02-27 01:24:27.176', '20260227012426_fix_logs_relation', NULL, NULL, '2026-02-27 01:24:26.989', 1),
('9cd34a6e-bb51-417e-a988-e42969588c53', 'e07bb148c7b2ee5c2d00fe599a4596c762e832d427144fbda57c502d94706c62', '2026-02-25 18:48:54.967', '20260225000147_regime_full_m2m', NULL, NULL, '2026-02-25 18:48:54.693', 1),
('a2ec36e7-2544-44c7-89fc-12abbbaef987', '688c53032c8f9829560dd4afcd60f9151ede300c61b36cd0a8d06024cd38d666', '2026-02-25 18:48:53.550', '20260222224201_init', NULL, NULL, '2026-02-25 18:48:53.271', 1),
('c0ca0faf-a4ac-4fc9-a334-a61e551c4604', 'b1f98fd146842dff7ff56bc50ce2b902a6153e8fe1352c17c9cf9c7f7723c9af', '2026-02-25 18:48:54.051', '20260224005732_init', NULL, NULL, '2026-02-25 18:48:53.554', 1);

-- --------------------------------------------------------

--
-- Structure de la table `_regimecategories`
--

CREATE TABLE `_regimecategories` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `_regimedocuments`
--

CREATE TABLE `_regimedocuments` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `_regimenationalites`
--

CREATE TABLE `_regimenationalites` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categorierelation`
--
ALTER TABLE `categorierelation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CategorieRelation_documentId_nationaliteId_key` (`documentId`,`nationaliteId`),
  ADD KEY `CategorieRelation_categorieId_fkey` (`categorieId`),
  ADD KEY `CategorieRelation_nationaliteId_fkey` (`nationaliteId`);

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
-- Index pour la table `visasearchlog`
--
ALTER TABLE `visasearchlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `VisaSearchLog_nationaliteId_fkey` (`nationaliteId`),
  ADD KEY `VisaSearchLog_documentId_fkey` (`documentId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `categorierelation`
--
ALTER TABLE `categorierelation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3232;

--
-- AUTO_INCREMENT pour la table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `nationalite`
--
ALTER TABLE `nationalite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `regime`
--
ALTER TABLE `regime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT pour la table `visasearchlog`
--
ALTER TABLE `visasearchlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categorierelation`
--
ALTER TABLE `categorierelation`
  ADD CONSTRAINT `CategorieRelation_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `CategorieRelation_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `CategorieRelation_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `nationalite` (`id`) ON UPDATE CASCADE;

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
-- Contraintes pour la table `visasearchlog`
--
ALTER TABLE `visasearchlog`
  ADD CONSTRAINT `VisaSearchLog_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `VisaSearchLog_nationaliteId_fkey` FOREIGN KEY (`nationaliteId`) REFERENCES `nationalite` (`id`) ON UPDATE CASCADE;

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
