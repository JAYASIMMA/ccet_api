import { Request, Response, NextFunction } from 'express';
import * as ExamModel from '../models/examination';

export const getExams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exams = await ExamModel.getAllExaminations();
        res.json(exams);
    } catch (error) {
        next(error);
    }
};

export const createExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = await ExamModel.createExamination(req.body);
        res.status(201).json({ message: 'Examination created', id });
    } catch (error) {
        next(error);
    }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ExamModel.deleteExamination(Number(req.params.id));
        res.json({ message: 'Examination deleted' });
    } catch (error) {
        next(error);
    }
};
