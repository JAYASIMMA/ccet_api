import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Teacher {
    id?: number;
    name: string;
    email: string;
    department: string;
    subject: string;
    password?: string;
}

export const getAllTeachers = async (): Promise<Teacher[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, department, subject FROM Teachers');
    return rows as Teacher[];
};

export const getTeacherById = async (id: number): Promise<Teacher | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, department, subject FROM Teachers WHERE id = ?', [id]);
    return (rows[0] as Teacher) || null;
};

export const getTeacherByEmail = async (email: string): Promise<Teacher | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Teachers WHERE email = ?', [email]);
    return (rows[0] as Teacher) || null;
};

export const createTeacher = async (teacher: Teacher): Promise<number> => {
    const [result] = await pool.query('INSERT INTO Teachers (name, email, department, subject, password) VALUES (?, ?, ?, ?, ?)',
        [teacher.name, teacher.email, teacher.department, teacher.subject, teacher.password]);
    return (result as any).insertId;
};

export const updateTeacher = async (id: number, teacher: Partial<Teacher>): Promise<void> => {
    await pool.query('UPDATE Teachers SET name = ?, department = ?, subject = ? WHERE id = ?',
        [teacher.name, teacher.department, teacher.subject, id]);
};

export const deleteTeacher = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM Teachers WHERE id = ?', [id]);
};
