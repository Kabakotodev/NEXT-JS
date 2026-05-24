//user.routes.ts

import express from 'express';
import * as userService from '../services/user.service';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.middleware';
import * as userController from "../controllers/user.controller";
//
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeAdmin);

router.put('/deactivate/:id', async (req, res) => {
  const user = await userService.updateUser(Number(req.params.id), {
    active: false,
  });
  res.json(user);
});

router.put(
  "/change-password",
  authenticateToken,
  userController.changePassword
);

// 🔐 ADMIN ONLY
router.use(authenticateToken);
router.use(authorizeAdmin);

// 🔎 GET ALL USERS
router.get("/", userController.getAllUsers);

// 🔎 GET USER BY ID
router.get("/:id", userController.getUserById);

// ✏ UPDATE USER (sans password)
router.put("/:id", userController.updateUser);

// 🗑 DELETE MULTIPLE
router.delete("/", userController.deleteUsers);

// 🔐 USER change own password
router.put("/change-password", userController.changePassword);

//
router.put("/:id/active", userController.toggleActive);

//
router.put("/:id/reset-password", userController.adminResetPassword);

export default router;