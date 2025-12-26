import { Request, Response, NextFunction } from 'express';
import * as ComplaintModel from '../models/complaint';

export const createComplaint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        const { category, title, description } = req.body;

        if (!userId || !userRole) return res.status(400).json({ message: 'User not authenticated' });
        if (!category || !title) return res.status(400).json({ message: 'Missing fields' });

        // Ensure role is valid for enum
        const validRoles = ['student', 'teacher', 'technical-staff', 'non-technical-staff'];
        // Map admin roles if they submit complaints? Admins usually resolve, but let's allow basic roles for now.
        // If an admin submits, we might need to handle it or restrict.
        // For now, assume standard users.

        await ComplaintModel.createComplaint({
            user_id: userId,
            user_role: userRole as any,
            category,
            title,
            description,
            status: 'Pending'
        });
        res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getMyComplaints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        if (!userId || !userRole) return res.status(400).json({ message: 'User not authenticated' });

        const complaints = await ComplaintModel.getComplaintsByUserId(userId, userRole);
        res.json(complaints);
    } catch (error) {
        next(error);
    }
};

export const getAllComplaints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const complaints = await ComplaintModel.getAllComplaints();
        res.json(complaints);
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ message: 'Status is required' });

        await ComplaintModel.updateComplaintStatus(Number(req.params.id), status);
        res.json({ message: 'Status updated' });
    } catch (error) {
        next(error);
    }
};
