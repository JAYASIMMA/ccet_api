import { Request, Response, NextFunction } from 'express';
import * as ProfileModel from '../models/teacherProfile';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacherId = req.user?.id;
        if (!teacherId) return res.status(400).json({ message: 'User ID missing' });

        const profile = await ProfileModel.getProfileByTeacherId(teacherId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacherId = req.user?.id;
        if (!teacherId) return res.status(400).json({ message: 'User ID missing' });

        await ProfileModel.upsertProfile({ ...req.body, teacher_id: teacherId });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        next(error);
    }
};
