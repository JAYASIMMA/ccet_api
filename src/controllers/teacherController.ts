import { Request, Response, NextFunction } from 'express';
import * as TeacherModel from '../models/teacher';

export const getTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherModel.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        next(error);
    }
};

export const getTeacherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacher = await TeacherModel.getTeacherById(Number(req.params.id));
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.json(teacher);
    } catch (error) {
        next(error);
    }
};

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TeacherModel.updateTeacher(Number(req.params.id), req.body);
        res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TeacherModel.deleteTeacher(Number(req.params.id));
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        next(error);
    }
};
