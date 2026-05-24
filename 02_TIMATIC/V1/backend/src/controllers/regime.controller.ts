
// import * as service from '../services/regime.service'
// import {Request,Response} from 'express'

// export const getAll=async(_:Request,res:Response)=>res.json(await service.getAll())
// export const getById=async(req:Request,res:Response)=>res.json(await service.getById(Number(req.params.id)))
// export const create=async(req:Request,res:Response)=>res.status(201).json(await service.create(req.body))
// export const update=async(req:Request,res:Response)=>res.json(await service.update(Number(req.params.id),req.body))
// export const remove=async(req:Request,res:Response)=>res.json(await service.remove(Number(req.params.id)))

// ################################################   ##############################
import { Request, Response } from "express";
import * as regimeService from "../services/regime.service";

/**
 * GET ALL REGIMES
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const regimes = await regimeService.getAll();
    return res.status(200).json(regimes);
  } catch (error) {
    console.error("GET ALL REGIMES ERROR:", error);
    return res.status(500).json({ message: "Erreur récupération régimes" });
  }
};

/**
 * GET REGIME BY ID
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const regime = await regimeService.getById(id);

    if (!regime) {
      return res.status(404).json({ message: "Régime introuvable" });
    }

    return res.status(200).json(regime);
  } catch (error) {
    console.error("GET REGIME ERROR:", error);
    return res.status(500).json({ message: "Erreur récupération régime" });
  }
};

/**
 * CREATE REGIME
 */
export const create = async (req: Request, res: Response) => {
  try {
    const {
      nomRegime,
      descRegime,
      objetRegime,
      documentIds,
      categorieIds,
      nationaliteIds,
    } = req.body;

    // Validation minimale
    if (!nomRegime) {
      return res.status(400).json({
        message: "Le nom du régime est obligatoire",
      });
    }

    const newRegime = await regimeService.create({
      nomRegime,
      descRegime,
      objetRegime,
      documentIds: documentIds || [],
      categorieIds: categorieIds || [],
      nationaliteIds: nationaliteIds || [],
    });

    return res.status(201).json(newRegime);
  } catch (error) {
    console.error("CREATE REGIME ERROR:", error);
    return res.status(500).json({ message: "Erreur création régime" });
  }
};

/**
 * UPDATE REGIME
 */
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const {
      nomRegime,
      descRegime,
      objetRegime,
      documentIds,
      categorieIds,
      nationaliteIds,
    } = req.body;

    const updatedRegime = await regimeService.update(id, {
      nomRegime,
      descRegime,
      objetRegime,
      documentIds: documentIds || [],
      categorieIds: categorieIds || [],
      nationaliteIds: nationaliteIds || [],
    });

    return res.status(200).json(updatedRegime);
  } catch (error) {
    console.error("UPDATE REGIME ERROR:", error);
    return res.status(500).json({ message: "Erreur modification régime" });
  }
};

/**
 * DELETE SINGLE REGIME
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    await regimeService.remove(id);

    return res.status(200).json({
      message: "Régime supprimé avec succès",
    });
  } catch (error) {
    console.error("DELETE REGIME ERROR:", error);
    return res.status(500).json({ message: "Erreur suppression régime" });
  }
};

/**
 * BULK DELETE REGIMES
 */
export const bulkDelete = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Liste d'IDs invalide",
      });
    }

    await regimeService.bulkDelete(ids);

    return res.status(200).json({
      message: "Régimes supprimés avec succès",
    });
  } catch (error) {
    console.error("BULK DELETE ERROR:", error);
    return res.status(500).json({
      message: "Erreur suppression multiple",
    });
  }
};