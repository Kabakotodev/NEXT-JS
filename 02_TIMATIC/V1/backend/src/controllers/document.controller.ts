
import * as service from '../services/document.service'
import {Request,Response} from 'express'

export const getAll=async(_:Request,res:Response)=>res.json(await service.getAll())
export const getById=async(req:Request,res:Response)=>res.json(await service.getById(Number(req.params.id)))
export const create=async(req:Request,res:Response)=>res.status(201).json(await service.create(req.body))
export const update=async(req:Request,res:Response)=>res.json(await service.update(Number(req.params.id),req.body))
export const remove=async(req:Request,res:Response)=>res.json(await service.remove(Number(req.params.id)))
