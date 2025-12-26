import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Admin {
    id?: number;
    name: string;
    email: string;
    role: 'admin' | 'super-admin' | 'transport-admin';
    password?: string;
}

export const getAllAdmins = async (): Promise<Admin[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM Admins');
    return rows as Admin[];
};

export const getAdminByEmail = async (email: string): Promise<Admin | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Admins WHERE email = ?', [email]);
    return (rows[0] as Admin) || null;
};

export const createAdmin = async (admin: Admin): Promise<number> => {
    const [result] = await pool.query('INSERT INTO Admins (name, email, role, password) VALUES (?, ?, ?, ?)',
        [admin.name, admin.email, admin.role, admin.password]);
    return (result as any).insertId;
};

export const deleteAdmin = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM Admins WHERE id = ?', [id]);
};
