import * as stats from "../controllers/visaStats.controller";
import router from "./visa.routes";

router.get("/stats/daily", stats.getDailyStats);
router.get("/stats/weekly", stats.getWeeklyStats);
router.get("/stats/monthly", stats.getMonthlyStats);
router.get("/stats/yearly", stats.getYearlyStats);