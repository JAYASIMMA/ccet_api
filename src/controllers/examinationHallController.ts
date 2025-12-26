import { Request, Response, NextFunction } from 'express';
import * as HallModel from '../models/examinationHall';

export const getHalls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const halls = await HallModel.getAllHalls();
        res.json(halls);
    } catch (error) {
        next(error);
    }
};

export const createHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = await HallModel.createHall(req.body);
        res.status(201).json({ message: 'Examination Hall created', id });
    } catch (error) {
        next(error);
    }
};

export const deleteHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await HallModel.deleteHall(Number(req.params.id));
        res.json({ message: 'Examination Hall deleted' });
    } catch (error) {
        next(error);
    }
};
