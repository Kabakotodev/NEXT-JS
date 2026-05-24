import { Request, Response } from "express";
import { prisma } from "../services/prisma.service";

/* ================================
   GEO FUNCTION
================================ */

const getGeoInfo = async (ip?: string) => {
  if (!ip) return {};

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    if (data.status === "success") {
      return {
        city: data.city,
        countryName: data.country,
        countryCode: data.countryCode,
      };
    }
  } catch (err) {
    console.log("Geo lookup failed");
  }

  return {};
};

/* ================================
   GET DOCUMENTS
================================ */

export const getDocuments = async (_: Request, res: Response) => {
  const docs = await prisma.document.findMany({
    select: {
      id: true,
      nomDocument: true,
    },
  });
  res.json(docs);
};

/* ================================
   GET NATIONALITES
================================ */

export const getNationalites = async (_: Request, res: Response) => {
  const pays = await prisma.nationalite.findMany({
    select: {
      id: true,
      nomPays: true,
    },
    orderBy: { nomPays: "asc" },
  });
  res.json(pays);
};

/* ================================
   SEARCH VISA CONDITIONS
================================ */

export const searchVisaConditions = async (req: Request, res: Response) => {
  const { nationaliteId, documentId } = req.query;

  const relation = await prisma.categorieRelation.findFirst({
    where: {
      nationaliteId: Number(nationaliteId),
      documentId: Number(documentId),
    },
    include: { categorie: true },
  });

  const resultFound = !!relation;

  /* =========================
     IP EXTRACTION PROPER
  ========================= */

  const rawIp =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "";

  const cleanedIp = rawIp.includes("::ffff:")
    ? rawIp.replace("::ffff:", "")
    : rawIp;

  const finalIp =
    cleanedIp === "127.0.0.1" || cleanedIp === "::1"
      ? "8.8.8.8" // 🔥 simulate public IP in local
      : cleanedIp;

  /* =========================
     GEO LOCATION
  ========================= */

  const geo = await getGeoInfo(finalIp ?? "");

  /* =========================
     SAVE LOG
  ========================= */

  await prisma.visaSearchLog.create({
    data: {
      nationaliteId: Number(nationaliteId),
      documentId: Number(documentId),
      resultFound,
      route: req.originalUrl,
      ipAddress: finalIp,  // ✅ IMPORTANT : utiliser finalIp
      userAgent: req.headers["user-agent"] || "",
      city: geo.city ?? null,
      countryName: geo.countryName ?? null,
      countryCode: geo.countryCode ?? null,
    },
  });

  if (!relation) {
    return res.json({
      found: false,
      message: "NO_RESULT",
    });
  }

  return res.json({
    found: true,
    descCategorie: relation.categorie.descCategorie,
    objetCategorie: relation.categorie.objetCategorie,
  });
};