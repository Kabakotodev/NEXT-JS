import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { prisma } from "../services/prisma.service";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken
} from "../utils/token";
import { logAction } from "../services/audit.service";


// ================= REGISTER =================
export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    await logAction({
      userId: user.id,
      action: "REGISTER",
      method: req.method,
      route: req.originalUrl,
      status: "SUCCESS",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json(user);

  } catch (error: any) {

    await logAction({
      action: "REGISTER_FAILED",
      method: req.method,
      route: req.originalUrl,
      status: "FAILED",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      details: error.message
    });

    res.status(400).json({ message: error.message });
  }
};


// ================= LOGIN =================
export const login = async (req: Request, res: Response) => {
  try {
    const { user } = await userService.authenticateUser(
      req.body.username,
      req.body.password
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    // ✅ Audit SUCCESS
    await logAction({
      userId: user.id,
      action: "LOGIN",
      method: req.method,
      route: req.originalUrl,
      status: "SUCCESS",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      accessToken,
      refreshToken
    });

  } catch (error: any) {

    // ❌ Audit FAILED
    await logAction({
      action: "LOGIN_FAILED",
      method: req.method,
      route: req.originalUrl,
      status: "FAILED",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      details: error.message
    });

    res.status(401).json({ message: error.message });
  }
};


// ================= REFRESH =================
export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token requis" });

    const hashed = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: hashed,
        revoked: false,
        expiresAt: { gt: new Date() }
      },
      include: { user: { include: { role: true } } }
    });

    if (!storedToken)
      return res.status(403).json({ message: "Refresh token invalide" });

    // 🔄 Rotation
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true }
    });

    const newAccessToken = generateAccessToken(storedToken.user);
    const newRefreshToken = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashToken(newRefreshToken),
        userId: storedToken.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    await logAction({
      userId: storedToken.user.id,
      action: "REFRESH_TOKEN",
      method: req.method,
      route: req.originalUrl,
      status: "SUCCESS",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (error: any) {

    await logAction({
      action: "REFRESH_FAILED",
      method: req.method,
      route: req.originalUrl,
      status: "FAILED",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      details: error.message
    });

    res.status(500).json({ message: "Erreur refresh token" });
  }
};


// ================= LOGOUT =================
export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token requis" });

    await prisma.refreshToken.updateMany({
      where: { token: hashToken(refreshToken) },
      data: { revoked: true }
    });

    await logAction({
      action: "LOGOUT",
      method: req.method,
      route: req.originalUrl,
      status: "SUCCESS",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({ message: "Déconnecté avec succès" });

  } catch (error: any) {

    await logAction({
      action: "LOGOUT_FAILED",
      method: req.method,
      route: req.originalUrl,
      status: "FAILED",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      details: error.message
    });

    res.status(500).json({ message: "Erreur logout" });
  }
};