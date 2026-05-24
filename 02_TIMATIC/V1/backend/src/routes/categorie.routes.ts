import express from "express";
import * as categorieController from "../controllers/categorie.controller";

const router = express.Router();

router.get("/", categorieController.getAll);
router.get("/:id", categorieController.getById);
router.post("/", categorieController.create);
router.put("/:id", categorieController.update);
router.delete("/:id", categorieController.remove);
router.post("/bulk-delete", categorieController.bulkDelete);

export default router;