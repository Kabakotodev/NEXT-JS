
// import {Router} from 'express'
// import * as controller from '../controllers/regime.controller'
// const router=Router()
// router.get('/',controller.getAll)
// router.get('/:id',controller.getById)
// router.post('/',controller.create)
// router.put('/:id',controller.update)
// router.delete('/:id',controller.remove)
// export default router

// ################################################   ##############################
import express from "express";
import * as regimeController from "../controllers/regime.controller";

const router = express.Router();

router.get("/", regimeController.getAll);
router.get("/:id", regimeController.getById);
router.post("/", regimeController.create);
router.put("/:id", regimeController.update);
router.delete("/:id", regimeController.remove);
router.post("/bulk-delete", regimeController.bulkDelete);

export default router;
