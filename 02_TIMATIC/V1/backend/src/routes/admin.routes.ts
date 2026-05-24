import { Router } from "express";
import * as stats from "../controllers/adminStats.controller";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.middleware";
import { prisma } from "../services/prisma.service";

const router = Router();

router.get("/stats/overview", stats.getOverviewStats);
router.get("/stats/top-nationalities", stats.getTopNationalities);
router.get("/stats/top-documents", stats.getTopDocuments);
router.get("/stats/success-rate", stats.getSuccessRate);
router.get("/stats/trend-30-days", stats.getTrend30Days);

router.get("/logs", stats.getSearchLogs);

router.get("/stats/anomalies", stats.detectAnomalies);

router.get("/stats/anomalies/high-failure", stats.detectHighFailureRate);

router.get("/stats/anomalies/country-scan", stats.detectCountryScanning);

//
router.get("/audit-logs", authenticateToken, authorizeAdmin, async (req, res) => {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true }
  });

  res.json(logs);
});
//
export default router;