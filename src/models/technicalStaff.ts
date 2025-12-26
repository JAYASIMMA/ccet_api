import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface TechnicalStaff {
    id?: number;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

export const getAllTechnicalStaff = async (): Promise<TechnicalStaff[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM TechnicalStaff');
    return rows as TechnicalStaff[];
};

export const getTechnicalStaffByEmail = async (email: string): Promise<TechnicalStaff | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM TechnicalStaff WHERE email = ?', [email]);
    return (rows[0] as TechnicalStaff) || null;
};

export const createTechnicalStaff = async (staff: TechnicalStaff): Promise<number> => {
    const [result] = await pool.query('INSERT INTO TechnicalStaff (name, email, password, role) VALUES (?, ?, ?, ?)',
        [staff.name, staff.email, staff.password, staff.role || 'technical-staff']);
    return (result as any).insertId;
};
