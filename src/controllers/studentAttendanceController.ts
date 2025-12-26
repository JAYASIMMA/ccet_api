import { Request, Response, NextFunction } from 'express';
import * as AttendanceModel from '../models/studentAttendance';

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { student_id, date, period, status, remarks, subject_id } = req.body;

        if (!student_id || !date || !status || !period) {
            return res.status(400).json({ message: 'Missing required fields (student_id, date, period, status)' });
        }

        const id = await AttendanceModel.markAttendance({ student_id, date, period, status, remarks, subject_id });
        res.json({ message: 'Attendance recorded successfully', id });
    } catch (error) {
        next(error);
    }
};

export const getMyAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) return res.status(400).json({ message: 'User ID missing' });

        const attendance = await AttendanceModel.getAttendanceByStudentId(studentId);
        res.json(attendance);
    } catch (error) {
        next(error);
    }
};

export const getStudentAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = Number(req.params.id);
        const attendance = await AttendanceModel.getAttendanceByStudentId(studentId);
        res.json(attendance);
    } catch (error) {
        next(error);
    }
};
