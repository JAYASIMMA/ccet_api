import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface ClassAssignment {
    id?: number;
    teacher_id: number;
    subject_name: string;
    class_name: string;
    day_of_week: string;
    time_slot: string;
}

export const getAllAssignments = async (): Promise<ClassAssignment[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM ClassAssignments');
    return rows as ClassAssignment[];
};

export const getAssignmentsByTeacher = async (teacherId: number): Promise<ClassAssignment[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM ClassAssignments WHERE teacher_id = ?', [teacherId]);
    return rows as ClassAssignment[];
};

export const createAssignment = async (assignment: ClassAssignment): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO ClassAssignments (teacher_id, subject_name, class_name, day_of_week, time_slot) VALUES (?, ?, ?, ?, ?)',
        [assignment.teacher_id, assignment.subject_name, assignment.class_name, assignment.day_of_week, assignment.time_slot]
    );
    return (result as any).insertId;
};

export const deleteAssignment = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM ClassAssignments WHERE id = ?', [id]);
};
