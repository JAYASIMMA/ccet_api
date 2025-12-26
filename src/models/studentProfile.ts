import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface StudentProfile {
    id?: number;
    student_id: number;
    date_of_birth?: Date;
    address?: string;
    phone_number?: string;
    guardian_name?: string;
    guardian_phone?: string;
}

export const getProfileByStudentId = async (studentId: number): Promise<StudentProfile | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM StudentProfiles WHERE student_id = ?', [studentId]);
    return (rows[0] as StudentProfile) || null;
};

export const upsertProfile = async (profile: StudentProfile): Promise<void> => {
    const existing = await getProfileByStudentId(profile.student_id);
    if (existing) {
        await pool.query(
            'UPDATE StudentProfiles SET date_of_birth=?, address=?, phone_number=?, guardian_name=?, guardian_phone=? WHERE student_id=?',
            [profile.date_of_birth, profile.address, profile.phone_number, profile.guardian_name, profile.guardian_phone, profile.student_id]
        );
    } else {
        await pool.query(
            'INSERT INTO StudentProfiles (student_id, date_of_birth, address, phone_number, guardian_name, guardian_phone) VALUES (?, ?, ?, ?, ?, ?)',
            [profile.student_id, profile.date_of_birth, profile.address, profile.phone_number, profile.guardian_name, profile.guardian_phone]
        );
    }
};
