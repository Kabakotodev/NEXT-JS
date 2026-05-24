import { Request, Response } from "express";
import { prisma } from "../services/prisma.service";

// Statistiques journalières
export const getDailyStats = async (_req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const stats = await prisma.visaSearchLog.groupBy({
    by: ["resultFound"],
    where: {
      createdAt: {
        gte: today
      }
    },
    _count: true
  });

  res.json(stats);
};

// Statistiques hebdomadaires
export const getWeeklyStats = async (_req: Request, res: Response) => {
  const now = new Date();
  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  firstDayOfWeek.setHours(0,0,0,0);

  const stats = await prisma.visaSearchLog.count({
    where: {
      createdAt: {
        gte: firstDayOfWeek
      }
    }
  });

  res.json({ total: stats });
};

// Mensuelles
export const getMonthlyStats = async (_req: Request, res: Response) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  const stats = await prisma.visaSearchLog.count({
    where: {
      createdAt: {
        gte: firstDay
      }
    }
  });

  res.json({ total: stats });
};

// Annuelles
export const getYearlyStats = async (_req: Request, res: Response) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);

  const stats = await prisma.visaSearchLog.count({
    where: {
      createdAt: {
        gte: firstDay
      }
    }
  });

  res.json({ total: stats });
};