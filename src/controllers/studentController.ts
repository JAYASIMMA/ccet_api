import { Request, Response, NextFunction } from 'express';
import * as StudentModel from '../models/student';

// Students
export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await StudentModel.getAllStudents();
        res.json(students);
    } catch (error) {
        next(error);
    }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentModel.getStudentById(Number(req.params.id));
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await StudentModel.updateStudent(Number(req.params.id), req.body);
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await StudentModel.deleteStudent(Number(req.params.id));
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        next(error);
    }
};
