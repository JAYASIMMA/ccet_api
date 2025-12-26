import { Request, Response, NextFunction } from 'express';
import * as TransportModel from '../models/transportMaintenance';

export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await TransportModel.getAllRecords();
        res.json(records);
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicle_number, driver_id, status } = req.body;
        if (!vehicle_number || !driver_id || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const id = await TransportModel.createRecord(req.body);
        res.status(201).json({ message: 'Transport record created', id });
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TransportModel.updateRecord(Number(req.params.id), req.body);
        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TransportModel.deleteRecord(Number(req.params.id));
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        next(error);
    }
};
