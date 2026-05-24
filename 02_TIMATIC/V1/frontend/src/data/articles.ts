export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Nouvelles conditions d'entrée pour les ressortissants de la CEDEAO",
    summary: "Le Sénégal met à jour les conditions d'accès pour les citoyens des pays membres de la CEDEAO à compter du 1er avril 2026.",
    content: "Le Ministère de l'Intérieur a annoncé de nouvelles dispositions facilitant l'entrée des ressortissants de la CEDEAO sur le territoire sénégalais...",
    category: "Réglementation",
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop",
    publishedAt: "2026-03-07T10:00:00Z",
    author: "Direction Générale",
  },
  {
    id: 2,
    title: "Ouverture du nouveau centre de traitement des visas à Dakar",
    summary: "Un centre moderne dédié au traitement accéléré des demandes de visa ouvre ses portes au Plateau.",
    content: "Dans le cadre de la modernisation des services d'immigration, un nouveau centre de traitement des visas a été inauguré...",
    category: "Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    publishedAt: "2026-03-05T14:30:00Z",
    author: "Service des Visas",
  },
  {
    id: 3,
    title: "Accord bilatéral Sénégal-Maroc : exemption de visa prolongée",
    summary: "Les citoyens marocains bénéficient désormais d'une exemption de visa étendue à 90 jours pour les séjours touristiques.",
    content: "Suite aux négociations entre les deux pays, l'accord d'exemption de visa a été renouvelé et étendu...",
    category: "Diplomatie",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    publishedAt: "2026-03-03T09:15:00Z",
    author: "Direction Générale",
  },
  {
    id: 4,
    title: "Digitalisation complète du processus de demande de visa",
    summary: "Les demandes de visa peuvent désormais être soumises entièrement en ligne via le nouveau portail numérique.",
    content: "Le gouvernement sénégalais poursuit sa transformation digitale avec le lancement d'un portail en ligne permettant...",
    category: "Innovation",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    publishedAt: "2026-02-28T11:00:00Z",
    author: "Service Informatique",
  },
  {
    id: 5,
    title: "Renforcement des contrôles aux frontières terrestres",
    summary: "De nouveaux postes de contrôle équipés de technologies biométriques sont déployés aux principales frontières.",
    content: "Dans le cadre du plan national de sécurisation des frontières, le Sénégal déploie de nouveaux équipements biométriques...",
    category: "Sécurité",
    imageUrl: "https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=600&h=400&fit=crop",
    publishedAt: "2026-02-25T08:45:00Z",
    author: "Direction Générale",
  },
  {
    id: 6,
    title: "Formation des agents d'immigration aux normes internationales",
    summary: "Un programme de formation certifié par l'OIM est lancé pour les agents des services d'immigration.",
    content: "En partenariat avec l'Organisation Internationale pour les Migrations, le Sénégal lance un programme de formation...",
    category: "Formation",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    publishedAt: "2026-02-20T16:00:00Z",
    author: "Service Accueil",
  },
  {
    id: 7,
    title: "Statistiques 2025 : hausse de 15% des entrées touristiques",
    summary: "Le rapport annuel révèle une augmentation significative du nombre de touristes étrangers au Sénégal.",
    content: "Le bilan annuel des services d'immigration montre une croissance continue du tourisme international vers le Sénégal...",
    category: "Statistiques",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    publishedAt: "2026-02-15T10:30:00Z",
    author: "Direction Générale",
  },
  {
    id: 8,
    title: "Partenariat avec l'Union Européenne pour la mobilité régulière",
    summary: "Un nouveau cadre de coopération est signé pour faciliter la mobilité légale entre le Sénégal et l'UE.",
    content: "Le Sénégal et l'Union Européenne ont signé un accord-cadre visant à promouvoir la migration régulière...",
    category: "Diplomatie",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    publishedAt: "2026-02-10T13:00:00Z",
    author: "Direction Générale",
  },
];

export function getArticlesSorted(): Article[] {
  return [...ARTICLES].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRecentArticles(count = 5): Article[] {
  return getArticlesSorted().slice(0, count);
}