import { Request, Response, NextFunction } from 'express';
import * as ProfileModel from '../models/studentProfile';
import { getStudentByEmail } from '../models/student';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id; // Assuming students can only see their own profile or handled via ID
        // If admin wants to see a student's profile, we might need a different route or check
        if (!studentId) return res.status(400).json({ message: 'User ID missing' });

        const profile = await ProfileModel.getProfileByStudentId(studentId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) return res.status(400).json({ message: 'User ID missing' });

        await ProfileModel.upsertProfile({ ...req.body, student_id: studentId });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        next(error);
    }
};
