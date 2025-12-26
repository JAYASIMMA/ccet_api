import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Student {
    id?: number;
    name: string;
    email: string;
    course: string;
    year: number;
    password?: string;
}

export const getAllStudents = async (): Promise<Student[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, course, year FROM Students');
    return rows as Student[];
};

export const getStudentById = async (id: number): Promise<Student | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, course, year FROM Students WHERE id = ?', [id]);
    return (rows[0] as Student) || null;
};

export const getStudentByEmail = async (email: string): Promise<Student | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Students WHERE email = ?', [email]);
    return (rows[0] as Student) || null;
};

export const createStudent = async (student: Student): Promise<number> => {
    const [result] = await pool.query('INSERT INTO Students (name, email, course, year, password) VALUES (?, ?, ?, ?, ?)',
        [student.name, student.email, student.course, student.year, student.password]);
    return (result as any).insertId;
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<void> => {
    await pool.query('UPDATE Students SET name = ?, course = ?, year = ? WHERE id = ?',
        [student.name, student.course, student.year, id]);
};
// Note: Password update usually handled separately or with care.

export const deleteStudent = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM Students WHERE id = ?', [id]);
};
