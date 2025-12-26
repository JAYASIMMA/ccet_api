import { Request, Response, NextFunction } from 'express';
import * as AssignmentModel from '../models/classAssignment';

export const getAllAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const assignments = await AssignmentModel.getAllAssignments();
        res.json(assignments);
    } catch (error) {
        next(error);
    }
};

export const getMyAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacherId = req.user?.id;
        if (!teacherId) return res.status(400).json({ message: 'User ID missing' });

        const assignments = await AssignmentModel.getAssignmentsByTeacher(teacherId);
        res.json(assignments);
    } catch (error) {
        next(error);
    }
};

export const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = await AssignmentModel.createAssignment(req.body);
        res.status(201).json({ message: 'Class Assignment created', id });
    } catch (error) {
        next(error);
    }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AssignmentModel.deleteAssignment(Number(req.params.id));
        res.json({ message: 'Class Assignment deleted' });
    } catch (error) {
        next(error);
    }
};
