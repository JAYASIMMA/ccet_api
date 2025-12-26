import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface NonTechnicalStaff {
    id?: number;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

export const getAllNonTechnicalStaff = async (): Promise<NonTechnicalStaff[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM NonTechnicalStaff');
    return rows as NonTechnicalStaff[];
};

export const getNonTechnicalStaffByEmail = async (email: string): Promise<NonTechnicalStaff | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM NonTechnicalStaff WHERE email = ?', [email]);
    return (rows[0] as NonTechnicalStaff) || null;
};

export const createNonTechnicalStaff = async (staff: NonTechnicalStaff): Promise<number> => {
    const [result] = await pool.query('INSERT INTO NonTechnicalStaff (name, email, password, role) VALUES (?, ?, ?, ?)',
        [staff.name, staff.email, staff.password, staff.role || 'non-technical-staff']);
    return (result as any).insertId;
};
