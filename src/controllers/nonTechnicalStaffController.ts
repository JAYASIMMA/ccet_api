import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as StaffModel from '../models/nonTechnicalStaff';

const JWT_SECRET = process.env.JWT_SECRET || 'secretString';

// Auth
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...data } = req.body;
        const existing = await StaffModel.getNonTechnicalStaffByEmail(data.email);
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await StaffModel.createNonTechnicalStaff({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Non-Technical Staff registered successfully' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await StaffModel.getNonTechnicalStaffByEmail(email);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: 'non-technical-staff', email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: 'non-technical-staff' } });
    } catch (error) {
        next(error);
    }
};

// Profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffId = req.params.id ? Number(req.params.id) : req.user?.id;
        if (!staffId) return res.status(400).json({ message: 'ID missing' });

        const profile = await StaffModel.getProfileByStaffId(staffId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffId = req.user?.id;
        if (!staffId) return res.status(400).json({ message: 'ID missing' });

        await StaffModel.upsertProfile({ ...req.body, staff_id: staffId });
        res.json({ message: 'Profile updated' });
    } catch (error) {
        next(error);
    }
};

// Attendance
export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { staff_id, date, status, remarks } = req.body;
        await StaffModel.markAttendance({ staff_id, date, status, remarks });
        res.json({ message: 'Attendance recorded' });
    } catch (error) {
        next(error);
    }
};

export const getAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffId = req.params.id ? Number(req.params.id) : req.user?.id;
        const attendance = await StaffModel.getAttendanceByStaffId(Number(staffId));
        res.json(attendance);
    } catch (error) {
        next(error);
    }
};
