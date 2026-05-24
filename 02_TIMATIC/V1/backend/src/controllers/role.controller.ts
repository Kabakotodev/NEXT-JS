// controllers/role.controller.ts
import * as service from '../services/role.service';
import { Request, Response } from 'express';

export const getAll = async (_: Request, res: Response) => {
  const data = await service.getAll();
  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  const data = await service.getById(Number(req.params.id));
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const { nomRole, descRole } = req.body;

  if (!nomRole || !descRole) {
    return res.status(400).json({
      message: "nomRole et descRole sont obligatoires"
    });
  }

  const data = await service.create({
    nomRole,
    descRole
  });

  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const data = await service.update(Number(req.params.id), req.body);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  const data = await service.remove(Number(req.params.id));
  res.json(data);
};
