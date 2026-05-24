import { Request, Response } from "express";
import * as categorieService from "../services/categorie.service";

/**
 * GET ALL
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await categorieService.getAll();
    return res.status(200).json(categories);
  } catch (error: any) {
    console.error("GET ALL CATEGORIES ERROR:", error);
    return res.status(500).json({
      message: error.message || "Erreur récupération catégories",
    });
  }
};

/**
 * GET BY ID
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const categorie = await categorieService.getById(id);

    if (!categorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json(categorie);
  } catch (error: any) {
    console.error("GET CATEGORIE ERROR:", error);
    return res.status(500).json({
      message: error.message || "Erreur récupération catégorie",
    });
  }
};

/**
 * CREATE
 */
export const create = async (req: Request, res: Response) => {
  try {
    const {
      nomCategorie,
      descCategorie,
      objetCategorie,
      relations,
    } = req.body;

    // Validation minimale
    if (!nomCategorie) {
      return res.status(400).json({
        message: "Le nom de la catégorie est obligatoire",
      });
    }

    if (!relations || !Array.isArray(relations) || relations.length === 0) {
      return res.status(400).json({
        message: "Au moins un document et une nationalité doivent être sélectionnés",
      });
    }

    const newCategorie = await categorieService.create({
      nomCategorie,
      descCategorie,
      objetCategorie,
      relations,
    });

    return res.status(201).json(newCategorie);
  } catch (error: any) {
    console.error("CREATE CATEGORIE ERROR:", error);

    return res.status(400).json({
      message: error.message || "Erreur création catégorie",
    });
  }
};

/**
 * UPDATE
 */
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const {
      nomCategorie,
      descCategorie,
      objetCategorie,
      relations,
    } = req.body;

    if (!nomCategorie) {
      return res.status(400).json({
        message: "Le nom de la catégorie est obligatoire",
      });
    }

    const updatedCategorie = await categorieService.update(id, {
      nomCategorie,
      descCategorie,
      objetCategorie,
      relations: relations || [],
    });

    return res.status(200).json(updatedCategorie);
  } catch (error: any) {
    console.error("UPDATE CATEGORIE ERROR:", error);

    return res.status(400).json({
      message: error.message || "Erreur modification catégorie",
    });
  }
};

/**
 * DELETE SINGLE
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    await categorieService.remove(id);

    return res.status(200).json({
      message: "Catégorie supprimée avec succès",
    });
  } catch (error: any) {
    console.error("DELETE CATEGORIE ERROR:", error);

    return res.status(500).json({
      message: error.message || "Erreur suppression catégorie",
    });
  }
};

/**
 * BULK DELETE
 */
export const bulkDelete = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Liste d'IDs invalide",
      });
    }

    await categorieService.bulkDelete(ids);

    return res.status(200).json({
      message: "Catégories supprimées avec succès",
    });
  } catch (error: any) {
    console.error("BULK DELETE ERROR:", error);

    return res.status(500).json({
      message: error.message || "Erreur suppression multiple",
    });
  }
};