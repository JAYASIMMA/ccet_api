import { Request, Response, NextFunction } from 'express';
import * as AdminModel from '../models/admin';
import bcrypt from 'bcryptjs';

export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await AdminModel.getAllAdmins();
        res.json(admins);
    } catch (error) {
        next(error);
    }
};

export const addAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...data } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await AdminModel.createAdmin({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AdminModel.deleteAdmin(Number(req.params.id));
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        next(error);
    }
};
