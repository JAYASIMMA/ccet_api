import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Examination {
    id?: number;
    exam_name: string;
    subject_code: string;
    exam_date: Date;
    duration_minutes: number;
    total_marks: number;
}

export const getAllExaminations = async (): Promise<Examination[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Examinations');
    return rows as Examination[];
};

export const createExamination = async (exam: Examination): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO Examinations (exam_name, subject_code, exam_date, duration_minutes, total_marks) VALUES (?, ?, ?, ?, ?)',
        [exam.exam_name, exam.subject_code, exam.exam_date, exam.duration_minutes, exam.total_marks]
    );
    return (result as any).insertId;
};

export const deleteExamination = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM Examinations WHERE id = ?', [id]);
};
