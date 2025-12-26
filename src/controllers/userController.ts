import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../models/student';
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../models/teacher';
import { getAllAdmins, createAdmin, deleteAdmin } from '../models/admin';

// Helper to standardise user object
const mapUser = (user: any, role: string) => ({ ...user, role });

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [students, teachers, admins] = await Promise.all([
            getAllStudents(),
            getAllTeachers(),
            getAllAdmins()
        ]);

        const allUsers = [
            ...students.map(u => mapUser(u, 'student')),
            ...teachers.map(u => mapUser(u, 'teacher')),
            ...admins.map(u => mapUser(u, u.role || 'admin')) // admin role is in db field
        ];

        res.json(allUsers);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    // Requires role in query to disambiguate ID: GET /users/1?role=student
    try {
        const { id } = req.params;
        const { role } = req.query;

        // Implementation omitted for brevity, similar to delete logic
        res.status(501).json({ message: 'To be implemented: requires role query param' });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role, password, ...data } = req.body;
        if (!role || !password) return res.status(400).json({ message: 'Role and password required' });

        const hashedPassword = await bcrypt.hash(password, 10);
        let id;

        if (role === 'student') {
            id = await createStudent({ ...data, password: hashedPassword });
        } else if (role === 'teacher') {
            id = await createTeacher({ ...data, password: hashedPassword });
        } else if (['admin', 'super-admin', 'transport-admin'].includes(role)) {
            id = await createAdmin({ ...data, role, password: hashedPassword });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        res.status(201).json({ message: 'User created', userId: id });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role } = req.query; // Expecting ?role=student

        if (!role) return res.status(400).json({ message: 'Role query parameter is required' });

        if (role === 'student') {
            await deleteStudent(Number(id));
        } else if (role === 'teacher') {
            await deleteTeacher(Number(id));
        } else if (['admin', 'super-admin', 'transport-admin'].includes(role as string)) {
            await deleteAdmin(Number(id));
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    // Logical place for toggling active/inactive if column existed
    res.status(200).json({ message: 'Status updated (simulation)' });
}
