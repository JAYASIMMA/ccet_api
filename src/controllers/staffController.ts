import { Request, Response, NextFunction } from 'express';
import * as TechnicalStaffModel from '../models/technicalStaff';
import * as NonTechnicalStaffModel from '../models/nonTechnicalStaff';
import bcrypt from 'bcryptjs';

// Technical Staff
export const getTechnicalStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = await TechnicalStaffModel.getAllTechnicalStaff();
        res.json(staff);
    } catch (error) {
        next(error);
    }
};

export const addTechnicalStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...data } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await TechnicalStaffModel.createTechnicalStaff({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Technical staff created successfully' });
    } catch (error) {
        next(error);
    }
};

// Non-Technical Staff
export const getNonTechnicalStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = await NonTechnicalStaffModel.getAllNonTechnicalStaff();
        res.json(staff);
    } catch (error) {
        next(error);
    }
};

export const addNonTechnicalStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...data } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await NonTechnicalStaffModel.createNonTechnicalStaff({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Non-technical staff created successfully' });
    } catch (error) {
        next(error);
    }
};
