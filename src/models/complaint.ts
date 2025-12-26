import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Complaint {
    id?: number;
    user_id: number;
    user_role: 'student' | 'teacher' | 'technical-staff' | 'non-technical-staff';
    category: 'Academic' | 'Infrastructure' | 'Transport' | 'Hostel' | 'Canteen' | 'Other';
    title: string;
    description?: string;
    status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
    created_at?: string;
}

export const createComplaint = async (complaint: Complaint): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO Complaints (user_id, user_role, category, title, description) VALUES (?, ?, ?, ?, ?)',
        [complaint.user_id, complaint.user_role, complaint.category, complaint.title, complaint.description]
    );
    return (result as any).insertId;
};

export const getComplaintsByUserId = async (userId: number, role: string): Promise<Complaint[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM Complaints WHERE user_id = ? AND user_role = ? ORDER BY created_at DESC',
        [userId, role]
    );
    return rows as Complaint[];
};

export const getAllComplaints = async (): Promise<Complaint[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Complaints ORDER BY created_at DESC');
    return rows as Complaint[];
};

export const updateComplaintStatus = async (id: number, status: string): Promise<void> => {
    await pool.query('UPDATE Complaints SET status = ? WHERE id = ?', [status, id]);
};
