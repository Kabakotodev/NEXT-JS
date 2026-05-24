
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  // Seed Nationalites (195 pays)
  for (const n of [
  {
    "nomPays": "Afghanistan",
    "codePays": "AFG",
    "nationaliteFr": "Afghane",
    "nationaliteEn": "Afghan"
  },
  {
    "nomPays": "Afrique du Sud",
    "codePays": "ZAF",
    "nationaliteFr": "Sud-africaine",
    "nationaliteEn": "South African"
  },
  {
    "nomPays": "Albanie",
    "codePays": "ALB",
    "nationaliteFr": "Albanaise",
    "nationaliteEn": "Albanian"
  },
  {
    "nomPays": "Alg\u00e9rie",
    "codePays": "DZA",
    "nationaliteFr": "Alg\u00e9rienne",
    "nationaliteEn": "Algerian"
  },
  {
    "nomPays": "Allemagne",
    "codePays": "DEU",
    "nationaliteFr": "Allemande",
    "nationaliteEn": "German"
  },
  {
    "nomPays": "Andorre",
    "codePays": "AND",
    "nationaliteFr": "Andorrane",
    "nationaliteEn": "Andorran"
  },
  {
    "nomPays": "Angola",
    "codePays": "AGO",
    "nationaliteFr": "Angolaise",
    "nationaliteEn": "Angolan"
  },
  {
    "nomPays": "Arabie Saoudite",
    "codePays": "SAU",
    "nationaliteFr": "Saoudienne",
    "nationaliteEn": "Saudi"
  },
  {
    "nomPays": "Argentine",
    "codePays": "ARG",
    "nationaliteFr": "Argentine",
    "nationaliteEn": "Argentinian"
  },
  {
    "nomPays": "Arm\u00e9nie",
    "codePays": "ARM",
    "nationaliteFr": "Arm\u00e9nienne",
    "nationaliteEn": "Armenian"
  },
  {
    "nomPays": "Australie",
    "codePays": "AUS",
    "nationaliteFr": "Australienne",
    "nationaliteEn": "Australian"
  },
  {
    "nomPays": "Autriche",
    "codePays": "AUT",
    "nationaliteFr": "Autrichienne",
    "nationaliteEn": "Austrian"
  },
  {
    "nomPays": "Azerba\u00efdjan",
    "codePays": "AZE",
    "nationaliteFr": "Azerba\u00efdjanaise",
    "nationaliteEn": "Azerbaijani"
  },
  {
    "nomPays": "Bahamas",
    "codePays": "BHS",
    "nationaliteFr": "Baham\u00e9enne",
    "nationaliteEn": "Bahamian"
  },
  {
    "nomPays": "Bahre\u00efn",
    "codePays": "BHR",
    "nationaliteFr": "Bahre\u00efnienne",
    "nationaliteEn": "Bahraini"
  },
  {
    "nomPays": "Bangladesh",
    "codePays": "BGD",
    "nationaliteFr": "Bangladaise",
    "nationaliteEn": "Bangladeshi"
  },
  {
    "nomPays": "Belgique",
    "codePays": "BEL",
    "nationaliteFr": "Belge",
    "nationaliteEn": "Belgian"
  },
  {
    "nomPays": "B\u00e9nin",
    "codePays": "BEN",
    "nationaliteFr": "B\u00e9ninoise",
    "nationaliteEn": "Beninese"
  },
  {
    "nomPays": "Bhoutan",
    "codePays": "BTN",
    "nationaliteFr": "Bhoutanaise",
    "nationaliteEn": "Bhutanese"
  },
  {
    "nomPays": "Bolivie",
    "codePays": "BOL",
    "nationaliteFr": "Bolivienne",
    "nationaliteEn": "Bolivian"
  },
  {
    "nomPays": "Bosnie-Herz\u00e9govine",
    "codePays": "BIH",
    "nationaliteFr": "Bosnienne",
    "nationaliteEn": "Bosnian"
  },
  {
    "nomPays": "Botswana",
    "codePays": "BWA",
    "nationaliteFr": "Botswanaise",
    "nationaliteEn": "Botswanan"
  },
  {
    "nomPays": "Br\u00e9sil",
    "codePays": "BRA",
    "nationaliteFr": "Br\u00e9silienne",
    "nationaliteEn": "Brazilian"
  },
  {
    "nomPays": "Brunei",
    "codePays": "BRN",
    "nationaliteFr": "Brun\u00e9ienne",
    "nationaliteEn": "Bruneian"
  },
  {
    "nomPays": "Bulgarie",
    "codePays": "BGR",
    "nationaliteFr": "Bulgare",
    "nationaliteEn": "Bulgarian"
  },
  {
    "nomPays": "Burkina Faso",
    "codePays": "BFA",
    "nationaliteFr": "Burkinab\u00e8",
    "nationaliteEn": "Burkinabe"
  },
  {
    "nomPays": "Burundi",
    "codePays": "BDI",
    "nationaliteFr": "Burundaise",
    "nationaliteEn": "Burundian"
  },
  {
    "nomPays": "Cambodge",
    "codePays": "KHM",
    "nationaliteFr": "Cambodgienne",
    "nationaliteEn": "Cambodian"
  },
  {
    "nomPays": "Cameroun",
    "codePays": "CMR",
    "nationaliteFr": "Camerounaise",
    "nationaliteEn": "Cameroonian"
  },
  {
    "nomPays": "Canada",
    "codePays": "CAN",
    "nationaliteFr": "Canadienne",
    "nationaliteEn": "Canadian"
  },
  {
    "nomPays": "Cap-Vert",
    "codePays": "CPV",
    "nationaliteFr": "Cap-verdienne",
    "nationaliteEn": "Cape Verdean"
  },
  {
    "nomPays": "Chili",
    "codePays": "CHL",
    "nationaliteFr": "Chilienne",
    "nationaliteEn": "Chilean"
  },
  {
    "nomPays": "Chine",
    "codePays": "CHN",
    "nationaliteFr": "Chinoise",
    "nationaliteEn": "Chinese"
  },
  {
    "nomPays": "Chypre",
    "codePays": "CYP",
    "nationaliteFr": "Chypriote",
    "nationaliteEn": "Cypriot"
  },
  {
    "nomPays": "Colombie",
    "codePays": "COL",
    "nationaliteFr": "Colombienne",
    "nationaliteEn": "Colombian"
  },
  {
    "nomPays": "Comores",
    "codePays": "COM",
    "nationaliteFr": "Comorienne",
    "nationaliteEn": "Comorian"
  },
  {
    "nomPays": "Congo",
    "codePays": "COG",
    "nationaliteFr": "Congolaise",
    "nationaliteEn": "Congolese"
  },
  {
    "nomPays": "Cor\u00e9e du Sud",
    "codePays": "KOR",
    "nationaliteFr": "Sud-cor\u00e9enne",
    "nationaliteEn": "South Korean"
  },
  {
    "nomPays": "Cor\u00e9e du Nord",
    "codePays": "PRK",
    "nationaliteFr": "Nord-cor\u00e9enne",
    "nationaliteEn": "North Korean"
  },
  {
    "nomPays": "Costa Rica",
    "codePays": "CRI",
    "nationaliteFr": "Costaricienne",
    "nationaliteEn": "Costa Rican"
  },
  {
    "nomPays": "C\u00f4te d\u2019Ivoire",
    "codePays": "CIV",
    "nationaliteFr": "Ivoirienne",
    "nationaliteEn": "Ivorian"
  },
  {
    "nomPays": "Croatie",
    "codePays": "HRV",
    "nationaliteFr": "Croate",
    "nationaliteEn": "Croatian"
  },
  {
    "nomPays": "Cuba",
    "codePays": "CUB",
    "nationaliteFr": "Cubaine",
    "nationaliteEn": "Cuban"
  },
  {
    "nomPays": "Danemark",
    "codePays": "DNK",
    "nationaliteFr": "Danoise",
    "nationaliteEn": "Danish"
  },
  {
    "nomPays": "Djibouti",
    "codePays": "DJI",
    "nationaliteFr": "Djiboutienne",
    "nationaliteEn": "Djiboutian"
  },
  {
    "nomPays": "\u00c9gypte",
    "codePays": "EGY",
    "nationaliteFr": "\u00c9gyptienne",
    "nationaliteEn": "Egyptian"
  },
  {
    "nomPays": "\u00c9mirats arabes unis",
    "codePays": "ARE",
    "nationaliteFr": "\u00c9mirienne",
    "nationaliteEn": "Emirati"
  },
  {
    "nomPays": "\u00c9quateur",
    "codePays": "ECU",
    "nationaliteFr": "\u00c9quatorienne",
    "nationaliteEn": "Ecuadorian"
  },
  {
    "nomPays": "Espagne",
    "codePays": "ESP",
    "nationaliteFr": "Espagnole",
    "nationaliteEn": "Spanish"
  },
  {
    "nomPays": "Estonie",
    "codePays": "EST",
    "nationaliteFr": "Estonienne",
    "nationaliteEn": "Estonian"
  },
  {
    "nomPays": "Eswatini",
    "codePays": "SWZ",
    "nationaliteFr": "Swazie",
    "nationaliteEn": "Swazi"
  },
  {
    "nomPays": "\u00c9tats-Unis",
    "codePays": "USA",
    "nationaliteFr": "Am\u00e9ricaine",
    "nationaliteEn": "American"
  },
  {
    "nomPays": "\u00c9thiopie",
    "codePays": "ETH",
    "nationaliteFr": "\u00c9thiopienne",
    "nationaliteEn": "Ethiopian"
  },
  {
    "nomPays": "Fidji",
    "codePays": "FJI",
    "nationaliteFr": "Fidjienne",
    "nationaliteEn": "Fijian"
  },
  {
    "nomPays": "Finlande",
    "codePays": "FIN",
    "nationaliteFr": "Finlandaise",
    "nationaliteEn": "Finnish"
  },
  {
    "nomPays": "France",
    "codePays": "FRA",
    "nationaliteFr": "Fran\u00e7aise",
    "nationaliteEn": "French"
  },
  {
    "nomPays": "Gabon",
    "codePays": "GAB",
    "nationaliteFr": "Gabonaise",
    "nationaliteEn": "Gabonese"
  },
  {
    "nomPays": "Gambie",
    "codePays": "GMB",
    "nationaliteFr": "Gambienne",
    "nationaliteEn": "Gambian"
  },
  {
    "nomPays": "Ghana",
    "codePays": "GHA",
    "nationaliteFr": "Ghan\u00e9enne",
    "nationaliteEn": "Ghanaian"
  },
  {
    "nomPays": "Gr\u00e8ce",
    "codePays": "GRC",
    "nationaliteFr": "Grecque",
    "nationaliteEn": "Greek"
  },
  {
    "nomPays": "Guin\u00e9e",
    "codePays": "GIN",
    "nationaliteFr": "Guin\u00e9enne",
    "nationaliteEn": "Guinean"
  },
  {
    "nomPays": "Guin\u00e9e-Bissau",
    "codePays": "GNB",
    "nationaliteFr": "Bissau-guin\u00e9enne",
    "nationaliteEn": "Bissau-Guinean"
  },
  {
    "nomPays": "Guin\u00e9e \u00e9quatoriale",
    "codePays": "GNQ",
    "nationaliteFr": "\u00c9quato-guin\u00e9enne",
    "nationaliteEn": "Equatorial Guinean"
  },
  {
    "nomPays": "Ha\u00efti",
    "codePays": "HTI",
    "nationaliteFr": "Ha\u00eftienne",
    "nationaliteEn": "Haitian"
  },
  {
    "nomPays": "Honduras",
    "codePays": "HND",
    "nationaliteFr": "Hondurienne",
    "nationaliteEn": "Honduran"
  },
  {
    "nomPays": "Hongrie",
    "codePays": "HUN",
    "nationaliteFr": "Hongroise",
    "nationaliteEn": "Hungarian"
  },
  {
    "nomPays": "Inde",
    "codePays": "IND",
    "nationaliteFr": "Indienne",
    "nationaliteEn": "Indian"
  },
  {
    "nomPays": "Indon\u00e9sie",
    "codePays": "IDN",
    "nationaliteFr": "Indon\u00e9sienne",
    "nationaliteEn": "Indonesian"
  },
  {
    "nomPays": "Irak",
    "codePays": "IRQ",
    "nationaliteFr": "Irakienne",
    "nationaliteEn": "Iraqi"
  },
  {
    "nomPays": "Iran",
    "codePays": "IRN",
    "nationaliteFr": "Iranienne",
    "nationaliteEn": "Iranian"
  },
  {
    "nomPays": "Irlande",
    "codePays": "IRL",
    "nationaliteFr": "Irlandaise",
    "nationaliteEn": "Irish"
  },
  {
    "nomPays": "Islande",
    "codePays": "ISL",
    "nationaliteFr": "Islandaise",
    "nationaliteEn": "Icelandic"
  },
  {
    "nomPays": "Isra\u00ebl",
    "codePays": "ISR",
    "nationaliteFr": "Isra\u00e9lienne",
    "nationaliteEn": "Israeli"
  },
  {
    "nomPays": "Italie",
    "codePays": "ITA",
    "nationaliteFr": "Italienne",
    "nationaliteEn": "Italian"
  },
  {
    "nomPays": "Jama\u00efque",
    "codePays": "JAM",
    "nationaliteFr": "Jama\u00efcaine",
    "nationaliteEn": "Jamaican"
  },
  {
    "nomPays": "Japon",
    "codePays": "JPN",
    "nationaliteFr": "Japonaise",
    "nationaliteEn": "Japanese"
  },
  {
    "nomPays": "Jordanie",
    "codePays": "JOR",
    "nationaliteFr": "Jordanienne",
    "nationaliteEn": "Jordanian"
  },
  {
    "nomPays": "Kazakhstan",
    "codePays": "KAZ",
    "nationaliteFr": "Kazakhstanaise",
    "nationaliteEn": "Kazakh"
  },
  {
    "nomPays": "Kenya",
    "codePays": "KEN",
    "nationaliteFr": "K\u00e9nyane",
    "nationaliteEn": "Kenyan"
  },
  {
    "nomPays": "Kirghizistan",
    "codePays": "KGZ",
    "nationaliteFr": "Kirghize",
    "nationaliteEn": "Kyrgyz"
  },
  {
    "nomPays": "Kowe\u00eft",
    "codePays": "KWT",
    "nationaliteFr": "Kowe\u00eftienne",
    "nationaliteEn": "Kuwaiti"
  },
  {
    "nomPays": "Laos",
    "codePays": "LAO",
    "nationaliteFr": "Laotienne",
    "nationaliteEn": "Lao"
  },
  {
    "nomPays": "Lesotho",
    "codePays": "LSO",
    "nationaliteFr": "Lesothane",
    "nationaliteEn": "Lesotho"
  },
  {
    "nomPays": "Lettonie",
    "codePays": "LVA",
    "nationaliteFr": "Lettonne",
    "nationaliteEn": "Latvian"
  },
  {
    "nomPays": "Liban",
    "codePays": "LBN",
    "nationaliteFr": "Libanaise",
    "nationaliteEn": "Lebanese"
  },
  {
    "nomPays": "Liberia",
    "codePays": "LBR",
    "nationaliteFr": "Lib\u00e9rienne",
    "nationaliteEn": "Liberian"
  },
  {
    "nomPays": "Libye",
    "codePays": "LBY",
    "nationaliteFr": "Libyenne",
    "nationaliteEn": "Libyan"
  },
  {
    "nomPays": "Lituanie",
    "codePays": "LTU",
    "nationaliteFr": "Lituanienne",
    "nationaliteEn": "Lithuanian"
  },
  {
    "nomPays": "Luxembourg",
    "codePays": "LUX",
    "nationaliteFr": "Luxembourgeoise",
    "nationaliteEn": "Luxembourgish"
  },
  {
    "nomPays": "Madagascar",
    "codePays": "MDG",
    "nationaliteFr": "Malgache",
    "nationaliteEn": "Malagasy"
  },
  {
    "nomPays": "Malaisie",
    "codePays": "MYS",
    "nationaliteFr": "Malaisienne",
    "nationaliteEn": "Malaysian"
  },
  {
    "nomPays": "Malawi",
    "codePays": "MWI",
    "nationaliteFr": "Malawienne",
    "nationaliteEn": "Malawian"
  },
  {
    "nomPays": "Maldives",
    "codePays": "MDV",
    "nationaliteFr": "Maldivienne",
    "nationaliteEn": "Maldivian"
  },
  {
    "nomPays": "Mali",
    "codePays": "MLI",
    "nationaliteFr": "Malienne",
    "nationaliteEn": "Malian"
  },
  {
    "nomPays": "Malte",
    "codePays": "MLT",
    "nationaliteFr": "Maltaise",
    "nationaliteEn": "Maltese"
  },
  {
    "nomPays": "Maroc",
    "codePays": "MAR",
    "nationaliteFr": "Marocaine",
    "nationaliteEn": "Moroccan"
  },
  {
    "nomPays": "Maurice",
    "codePays": "MUS",
    "nationaliteFr": "Mauricienne",
    "nationaliteEn": "Mauritian"
  },
  {
    "nomPays": "Mauritanie",
    "codePays": "MRT",
    "nationaliteFr": "Mauritanienne",
    "nationaliteEn": "Mauritanian"
  },
  {
    "nomPays": "Mexique",
    "codePays": "MEX",
    "nationaliteFr": "Mexicaine",
    "nationaliteEn": "Mexican"
  },
  {
    "nomPays": "Moldavie",
    "codePays": "MDA",
    "nationaliteFr": "Moldave",
    "nationaliteEn": "Moldovan"
  },
  {
    "nomPays": "Monaco",
    "codePays": "MCO",
    "nationaliteFr": "Mon\u00e9gasque",
    "nationaliteEn": "Monegasque"
  },
  {
    "nomPays": "Mongolie",
    "codePays": "MNG",
    "nationaliteFr": "Mongole",
    "nationaliteEn": "Mongolian"
  },
  {
    "nomPays": "Mont\u00e9n\u00e9gro",
    "codePays": "MNE",
    "nationaliteFr": "Mont\u00e9n\u00e9grine",
    "nationaliteEn": "Montenegrin"
  },
  {
    "nomPays": "Mozambique",
    "codePays": "MOZ",
    "nationaliteFr": "Mozambicaine",
    "nationaliteEn": "Mozambican"
  },
  {
    "nomPays": "Myanmar",
    "codePays": "MMR",
    "nationaliteFr": "Birmane",
    "nationaliteEn": "Burmese"
  },
  {
    "nomPays": "Namibie",
    "codePays": "NAM",
    "nationaliteFr": "Namibienne",
    "nationaliteEn": "Namibian"
  },
  {
    "nomPays": "N\u00e9pal",
    "codePays": "NPL",
    "nationaliteFr": "N\u00e9palaise",
    "nationaliteEn": "Nepalese"
  },
  {
    "nomPays": "Nicaragua",
    "codePays": "NIC",
    "nationaliteFr": "Nicaraguayenne",
    "nationaliteEn": "Nicaraguan"
  },
  {
    "nomPays": "Niger",
    "codePays": "NER",
    "nationaliteFr": "Nig\u00e9rienne",
    "nationaliteEn": "Nigerien"
  },
  {
    "nomPays": "Nigeria",
    "codePays": "NGA",
    "nationaliteFr": "Nig\u00e9riane",
    "nationaliteEn": "Nigerian"
  },
  {
    "nomPays": "Norv\u00e8ge",
    "codePays": "NOR",
    "nationaliteFr": "Norv\u00e9gienne",
    "nationaliteEn": "Norwegian"
  },
  {
    "nomPays": "Nouvelle-Z\u00e9lande",
    "codePays": "NZL",
    "nationaliteFr": "N\u00e9o-z\u00e9landaise",
    "nationaliteEn": "New Zealander"
  },
  {
    "nomPays": "Oman",
    "codePays": "OMN",
    "nationaliteFr": "Omanaise",
    "nationaliteEn": "Omani"
  },
  {
    "nomPays": "Ouganda",
    "codePays": "UGA",
    "nationaliteFr": "Ougandaise",
    "nationaliteEn": "Ugandan"
  },
  {
    "nomPays": "Ouzb\u00e9kistan",
    "codePays": "UZB",
    "nationaliteFr": "Ouzb\u00e8ke",
    "nationaliteEn": "Uzbek"
  },
  {
    "nomPays": "Pakistan",
    "codePays": "PAK",
    "nationaliteFr": "Pakistanaise",
    "nationaliteEn": "Pakistani"
  },
  {
    "nomPays": "Panama",
    "codePays": "PAN",
    "nationaliteFr": "Panam\u00e9enne",
    "nationaliteEn": "Panamanian"
  },
  {
    "nomPays": "Paraguay",
    "codePays": "PRY",
    "nationaliteFr": "Paraguayenne",
    "nationaliteEn": "Paraguayan"
  },
  {
    "nomPays": "Pays-Bas",
    "codePays": "NLD",
    "nationaliteFr": "N\u00e9erlandaise",
    "nationaliteEn": "Dutch"
  },
  {
    "nomPays": "P\u00e9rou",
    "codePays": "PER",
    "nationaliteFr": "P\u00e9ruvienne",
    "nationaliteEn": "Peruvian"
  },
  {
    "nomPays": "Philippines",
    "codePays": "PHL",
    "nationaliteFr": "Philippine",
    "nationaliteEn": "Filipino"
  },
  {
    "nomPays": "Pologne",
    "codePays": "POL",
    "nationaliteFr": "Polonaise",
    "nationaliteEn": "Polish"
  },
  {
    "nomPays": "Portugal",
    "codePays": "PRT",
    "nationaliteFr": "Portugaise",
    "nationaliteEn": "Portuguese"
  },
  {
    "nomPays": "Qatar",
    "codePays": "QAT",
    "nationaliteFr": "Qatarienne",
    "nationaliteEn": "Qatari"
  },
  {
    "nomPays": "R\u00e9publique centrafricaine",
    "codePays": "CAF",
    "nationaliteFr": "Centrafricaine",
    "nationaliteEn": "Central African"
  },
  {
    "nomPays": "R\u00e9publique d\u00e9mocratique du Congo",
    "codePays": "COD",
    "nationaliteFr": "Congolaise (RDC)",
    "nationaliteEn": "Congolese (DRC)"
  },
  {
    "nomPays": "R\u00e9publique dominicaine",
    "codePays": "DOM",
    "nationaliteFr": "Dominicaine",
    "nationaliteEn": "Dominican"
  },
  {
    "nomPays": "Roumanie",
    "codePays": "ROU",
    "nationaliteFr": "Roumaine",
    "nationaliteEn": "Romanian"
  },
  {
    "nomPays": "Royaume-Uni",
    "codePays": "GBR",
    "nationaliteFr": "Britannique",
    "nationaliteEn": "British"
  },
  {
    "nomPays": "Russie",
    "codePays": "RUS",
    "nationaliteFr": "Russe",
    "nationaliteEn": "Russian"
  },
  {
    "nomPays": "Rwanda",
    "codePays": "RWA",
    "nationaliteFr": "Rwandaise",
    "nationaliteEn": "Rwandan"
  },
  {
    "nomPays": "S\u00e9n\u00e9gal",
    "codePays": "SEN",
    "nationaliteFr": "S\u00e9n\u00e9galaise",
    "nationaliteEn": "Senegalese"
  },
  {
    "nomPays": "Serbie",
    "codePays": "SRB",
    "nationaliteFr": "Serbe",
    "nationaliteEn": "Serbian"
  },
  {
    "nomPays": "Seychelles",
    "codePays": "SYC",
    "nationaliteFr": "Seychelloise",
    "nationaliteEn": "Seychellois"
  },
  {
    "nomPays": "Sierra Leone",
    "codePays": "SLE",
    "nationaliteFr": "Sierra-l\u00e9onaise",
    "nationaliteEn": "Sierra Leonean"
  },
  {
    "nomPays": "Singapour",
    "codePays": "SGP",
    "nationaliteFr": "Singapourienne",
    "nationaliteEn": "Singaporean"
  },
  {
    "nomPays": "Slovaquie",
    "codePays": "SVK",
    "nationaliteFr": "Slovaque",
    "nationaliteEn": "Slovak"
  },
  {
    "nomPays": "Slov\u00e9nie",
    "codePays": "SVN",
    "nationaliteFr": "Slov\u00e8ne",
    "nationaliteEn": "Slovenian"
  },
  {
    "nomPays": "Somalie",
    "codePays": "SOM",
    "nationaliteFr": "Somalienne",
    "nationaliteEn": "Somali"
  },
  {
    "nomPays": "Soudan",
    "codePays": "SDN",
    "nationaliteFr": "Soudanaise",
    "nationaliteEn": "Sudanese"
  },
  {
    "nomPays": "Soudan du Sud",
    "codePays": "SSD",
    "nationaliteFr": "Sud-soudanaise",
    "nationaliteEn": "South Sudanese"
  },
  {
    "nomPays": "Sri Lanka",
    "codePays": "LKA",
    "nationaliteFr": "Sri-lankaise",
    "nationaliteEn": "Sri Lankan"
  },
  {
    "nomPays": "Su\u00e8de",
    "codePays": "SWE",
    "nationaliteFr": "Su\u00e9doise",
    "nationaliteEn": "Swedish"
  },
  {
    "nomPays": "Suisse",
    "codePays": "CHE",
    "nationaliteFr": "Suisse",
    "nationaliteEn": "Swiss"
  },
  {
    "nomPays": "Suriname",
    "codePays": "SUR",
    "nationaliteFr": "Surinamaise",
    "nationaliteEn": "Surinamese"
  },
  {
    "nomPays": "Syrie",
    "codePays": "SYR",
    "nationaliteFr": "Syrienne",
    "nationaliteEn": "Syrian"
  },
  {
    "nomPays": "Tadjikistan",
    "codePays": "TJK",
    "nationaliteFr": "Tadjike",
    "nationaliteEn": "Tajik"
  },
  {
    "nomPays": "Tanzanie",
    "codePays": "TZA",
    "nationaliteFr": "Tanzanienne",
    "nationaliteEn": "Tanzanian"
  },
  {
    "nomPays": "Tchad",
    "codePays": "TCD",
    "nationaliteFr": "Tchadienne",
    "nationaliteEn": "Chadian"
  },
  {
    "nomPays": "Tch\u00e9quie",
    "codePays": "CZE",
    "nationaliteFr": "Tch\u00e8que",
    "nationaliteEn": "Czech"
  },
  {
    "nomPays": "Tha\u00eflande",
    "codePays": "THA",
    "nationaliteFr": "Tha\u00eflandaise",
    "nationaliteEn": "Thai"
  },
  {
    "nomPays": "Timor oriental",
    "codePays": "TLS",
    "nationaliteFr": "Est-timoraise",
    "nationaliteEn": "East Timorese"
  },
  {
    "nomPays": "Togo",
    "codePays": "TGO",
    "nationaliteFr": "Togolaise",
    "nationaliteEn": "Togolese"
  },
  {
    "nomPays": "Trinit\u00e9-et-Tobago",
    "codePays": "TTO",
    "nationaliteFr": "Trinidadienne",
    "nationaliteEn": "Trinidadian"
  },
  {
    "nomPays": "Tunisie",
    "codePays": "TUN",
    "nationaliteFr": "Tunisienne",
    "nationaliteEn": "Tunisian"
  },
  {
    "nomPays": "Turquie",
    "codePays": "TUR",
    "nationaliteFr": "Turque",
    "nationaliteEn": "Turkish"
  },
  {
    "nomPays": "Ukraine",
    "codePays": "UKR",
    "nationaliteFr": "Ukrainienne",
    "nationaliteEn": "Ukrainian"
  },
  {
    "nomPays": "Uruguay",
    "codePays": "URY",
    "nationaliteFr": "Uruguayenne",
    "nationaliteEn": "Uruguayan"
  },
  {
    "nomPays": "Vanuatu",
    "codePays": "VUT",
    "nationaliteFr": "Vanuataise",
    "nationaliteEn": "Ni-Vanuatu"
  },
  {
    "nomPays": "Venezuela",
    "codePays": "VEN",
    "nationaliteFr": "V\u00e9n\u00e9zu\u00e9lienne",
    "nationaliteEn": "Venezuelan"
  },
  {
    "nomPays": "Vietnam",
    "codePays": "VNM",
    "nationaliteFr": "Vietnamienne",
    "nationaliteEn": "Vietnamese"
  },
  {
    "nomPays": "Y\u00e9men",
    "codePays": "YEM",
    "nationaliteFr": "Y\u00e9m\u00e9nite",
    "nationaliteEn": "Yemeni"
  },
  {
    "nomPays": "Zambie",
    "codePays": "ZMB",
    "nationaliteFr": "Zambienne",
    "nationaliteEn": "Zambian"
  },
  {
    "nomPays": "Zimbabwe",
    "codePays": "ZWE",
    "nationaliteFr": "Zimbabw\u00e9enne",
    "nationaliteEn": "Zimbabwean"
  }
]) {
    await prisma.nationalite.upsert({
      where: { codePays: n.codePays },
      update: {},
      create: n
    })
  }

  // Seed Documents
  // await prisma.document.createMany({
  //   data: [
  //     { nomDocument: "Passeport", sigleDocument: "PPT", descDocument: "Document de voyage international" },
  //     { nomDocument: "Visa", sigleDocument: "VSA", descDocument: "Autorisation d'entrée" },
  //     { nomDocument: "Carte de séjour", sigleDocument: "CDS", descDocument: "Titre de résidence" }
  //   ],
  //   skipDuplicates: true
  // })

  // Seed Categories
  // await prisma.categorie.createMany({
  //   data: [
  //     { nomCategorie: "Court séjour", descCategorie: "Moins de 90 jours" },
  //     { nomCategorie: "Long séjour", descCategorie: "Plus de 90 jours" },
  //     { nomCategorie: "Diplomatique", descCategorie: "Mission diplomatique" }
  //   ],
  //   skipDuplicates: true
  // })

  // Seed Regimes (exemples)
  // await prisma.regime.createMany({
  //   data: [
  //     { nomRegime: "Exemption Visa CEDEAO", descRegime: "Libre circulation", objetRegime: "Les ressortissants CEDEAO sont exemptés.", documentId: 2, categorieId: 1, nationaliteId: 1 },
  //     { nomRegime: "Visa obligatoire USA", descRegime: "Visa requis", objetRegime: "Visa obligatoire avant entrée.", documentId: 2, categorieId: 2, nationaliteId: 50 }
  //   ],
  //   skipDuplicates: true
  // })

  console.log("Seed complet terminé ✅")
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
