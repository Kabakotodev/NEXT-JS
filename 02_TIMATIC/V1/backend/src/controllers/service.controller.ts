// controllers/service.controller.ts
import * as service from '../services/service.service';
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
  const data = await service.create(req.body);
  res.json(data);
};

export const update = async (req: Request, res: Response) => {
  const data = await service.update(Number(req.params.id), req.body);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  const data = await service.remove(Number(req.params.id));
  res.json(data);
};
