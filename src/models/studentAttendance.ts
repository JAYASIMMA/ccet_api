import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface StudentAttendance {
    id?: number;
    student_id: number;
    date: string; // YYYY-MM-DD
    period: string; // e.g., "Period 1", "Morning"
    subject_id?: number;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
    remarks?: string;
    recorded_at?: Date;
}

export const markAttendance = async (attendance: StudentAttendance): Promise<number> => {
    // Check if attendance already exists for this student on this date AND period
    const query = 'SELECT id FROM StudentAttendance WHERE student_id = ? AND date = ? AND period = ?';
    const params = [attendance.student_id, attendance.date, attendance.period];

    const [existing] = await pool.query<RowDataPacket[]>(query, params);

    if (existing.length > 0) {
        // Update existing
        await pool.query(
            'UPDATE StudentAttendance SET status = ?, remarks = ?, subject_id = ? WHERE id = ?',
            [attendance.status, attendance.remarks, attendance.subject_id || null, existing[0].id]
        );
        return existing[0].id;
    } else {
        // Insert new
        const [result] = await pool.query(
            'INSERT INTO StudentAttendance (student_id, date, period, subject_id, status, remarks) VALUES (?, ?, ?, ?, ?, ?)',
            [attendance.student_id, attendance.date, attendance.period, attendance.subject_id || null, attendance.status, attendance.remarks]
        );
        return (result as any).insertId;
    }
};

export const getAttendanceByStudentId = async (studentId: number): Promise<StudentAttendance[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM StudentAttendance WHERE student_id = ? ORDER BY date DESC, period ASC',
        [studentId]
    );
    return rows as StudentAttendance[];
};

export const getAttendanceByDate = async (date: string): Promise<StudentAttendance[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM StudentAttendance WHERE date = ?',
        [date]
    );
    return rows as StudentAttendance[];
};
