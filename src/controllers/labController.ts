import { Request, Response, NextFunction } from 'express';
import * as LabModel from '../models/lab';

export const getLabs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const labs = await LabModel.getAllLabs();
        res.json(labs);
    } catch (error) {
        next(error);
    }
};

export const createLab = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const labId = await LabModel.createLab(req.body);
        res.status(201).json({ message: 'Lab created successfully', labId });
    } catch (error) {
        next(error);
    }
};

export const assignIncharge = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inchargeId = await LabModel.assignLabIncharge(req.body);
        res.status(201).json({ message: 'Lab incharge assigned successfully', inchargeId });
    } catch (error) {
        next(error);
    }
};

export const getIncharges = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incharges = await LabModel.getLabIncharges(Number(req.params.labId));
        res.json(incharges);
    } catch (error) {
        next(error);
    }
};
