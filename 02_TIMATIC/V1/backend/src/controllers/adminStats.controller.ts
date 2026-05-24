import { Request, Response } from "express";
import { prisma } from "../services/prisma.service";

export const getOverviewStats = async (_req: Request, res: Response) => {

  const now = new Date();

  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);

  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startYear = new Date(now.getFullYear(), 0, 1);

  const [
    today,
    month,
    year,
    total
  ] = await Promise.all([
    prisma.visaSearchLog.count({ where: { createdAt: { gte: startToday } } }),
    prisma.visaSearchLog.count({ where: { createdAt: { gte: startMonth } } }),
    prisma.visaSearchLog.count({ where: { createdAt: { gte: startYear } } }),
    prisma.visaSearchLog.count()
  ]);

  res.json({ today, month, year, total });
};

export const getTopNationalities = async (_req: Request, res: Response) => {
  const stats = await prisma.visaSearchLog.groupBy({
    by: ["nationaliteId"],
    _count: { nationaliteId: true },
    orderBy: { _count: { nationaliteId: "desc" } },
    take: 10,
  });

  const enriched = await Promise.all(
    stats.map(async (stat) => {
      const nat = await prisma.nationalite.findUnique({
        where: { id: stat.nationaliteId },
      });

      return {
        country: nat?.nomPays,
        total: stat._count.nationaliteId,
      };
    })
  );

  res.json(enriched);
};

export const getTopDocuments = async (_req: Request, res: Response) => {
  const stats = await prisma.visaSearchLog.groupBy({
    by: ["documentId"],
    _count: { documentId: true },
    orderBy: { _count: { documentId: "desc" } },
    take: 10,
  });

  const enriched = await Promise.all(
    stats.map(async (stat) => {
      const doc = await prisma.document.findUnique({
        where: { id: stat.documentId },
      });

      return {
        document: doc?.nomDocument,
        total: stat._count.documentId,
      };
    })
  );

  res.json(enriched);
};

export const getSuccessRate = async (_req: Request, res: Response) => {
  const total = await prisma.visaSearchLog.count();
  const found = await prisma.visaSearchLog.count({
    where: { resultFound: true }
  });

  const rate = total > 0 ? (found / total) * 100 : 0;

  res.json({
    total,
    found,
    notFound: total - found,
    successRate: rate.toFixed(2)
  });
};

export const getTrend30Days = async (_req: Request, res: Response) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const logs = await prisma.visaSearchLog.findMany({
    where: { createdAt: { gte: startDate } },
    orderBy: { createdAt: "asc" }
  });

  const grouped: Record<string, number> = {};

  logs.forEach((log) => {
    const date = log.createdAt.toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + 1;
  });

  res.json(grouped);
};

// Les logs de recherche de visa sont enregistrés dans la table `visaSearchLog` à chaque fois qu'un utilisateur effectue une recherche. Chaque log contient des informations telles que la nationalité recherchée, le document utilisé, le résultat de la recherche (trouvé ou non), et la date de la recherche. Ces données permettent de générer des statistiques détaillées sur les tendances de recherche, les nationalités les plus recherchées, les documents les plus utilisés, et le taux de succès global des recherches.
export const getSearchLogs = async (req: Request, res: Response) => {

  const logs = await prisma.visaSearchLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200, // limite sécurité
    include: {
      nationalite: true,
      document: true,
    },
  });

  const formatted = logs.map((log) => ({
    id: log.id,
    ip: log.ipAddress,
    route: log.route,
    country: log.nationalite.nomPays,
    document: log.document.nomDocument,
    result: log.resultFound ? "Trouvé" : "Aucun résultat",
    date: log.createdAt,
    userAgent: log.userAgent,
  }));

  res.json(formatted);
};

// Detection d'anomalies basique : IP avec trop de requêtes en peu de temps
export const detectAnomalies = async (
  _req: Request,
  res: Response
) => {

  const THRESHOLD = 100;
  const HOURS = 1;

  const since = new Date();
  since.setHours(since.getHours() - HOURS);

  const grouped = await prisma.visaSearchLog.groupBy({
    by: ["ipAddress"],
    where: {
      createdAt: { gte: since }
    },
    _count: {
      ipAddress: true
    }
  });

  const suspicious = grouped
    .filter(g => 
      g.ipAddress !== null &&
      g._count.ipAddress >= THRESHOLD
    )
    .map(g => ({
      ip: g.ipAddress as string,
      totalRequests: g._count.ipAddress,
      periodHours: HOURS
    }));

  res.json({
    threshold: THRESHOLD,
    suspiciousCount: suspicious.length,
    suspicious
  });
};

// detectHighFailureRate
export const detectHighFailureRate = async (
  _req: Request,
  res: Response
) => {

  const THRESHOLD_REQUESTS = 20;
  const FAILURE_PERCENT = 80;
  const HOURS = 1;

  const since = new Date();
  since.setHours(since.getHours() - HOURS);

  const logs = await prisma.visaSearchLog.findMany({
    where: {
      createdAt: { gte: since }
    }
  });

  // 👇 Type sécurisé
  const grouped: Record<
    string,
    { total: number; failures: number }
  > = {};

  logs.forEach(log => {
    if (!log.ipAddress) return; // 🔥 ignore null

    if (!grouped[log.ipAddress]) {
      grouped[log.ipAddress] = {
        total: 0,
        failures: 0
      };
    }

    grouped[log.ipAddress].total++;

    if (!log.resultFound) {
      grouped[log.ipAddress].failures++;
    }
  });

  const suspicious = Object.entries(grouped)
    .filter(([ip, data]) => {
      const failureRate = (data.failures / data.total) * 100;
      return (
        data.total >= THRESHOLD_REQUESTS &&
        failureRate >= FAILURE_PERCENT
      );
    })
    .map(([ip, data]) => ({
      ip,
      totalRequests: data.total,
      failureRate: (
        (data.failures / data.total) * 100
      ).toFixed(2)
    }));

  res.json({
    suspiciousCount: suspicious.length,
    suspicious
  });
};

// detectCountryScanning
export const detectCountryScanning = async (
  _req: Request,
  res: Response
) => {

  const HOURS = 1;
  const MIN_COUNTRIES = 10;

  const since = new Date();
  since.setHours(since.getHours() - HOURS);

  const logs = await prisma.visaSearchLog.findMany({
    where: {
      createdAt: { gte: since }
    }
  });

  // 👇 Type sécurisé
  const grouped: Record<string, Set<number>> = {};

  logs.forEach(log => {
    if (!log.ipAddress) return; // 🔥 ignore null

    if (!grouped[log.ipAddress]) {
      grouped[log.ipAddress] = new Set<number>();
    }

    grouped[log.ipAddress].add(log.nationaliteId);
  });

  const suspicious = Object.entries(grouped)
    .filter(([_, countriesSet]) =>
      countriesSet.size >= MIN_COUNTRIES
    )
    .map(([ip, countriesSet]) => ({
      ip,
      countriesTested: countriesSet.size
    }));

  res.json({
    suspiciousCount: suspicious.length,
    suspicious
  });
};