import { Router } from "express";
import * as controller from "../controllers/visa.controller";

const router = Router();

router.get("/documents", controller.getDocuments);
router.get("/nationalites", controller.getNationalites);
router.get("/search", controller.searchVisaConditions);

export default router;