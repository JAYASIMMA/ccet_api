import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface TeacherProfile {
    id?: number;
    teacher_id: number;
    date_of_birth?: string;
    address?: string;
    phone_number?: string;
    qualification?: string;
    experience_years?: number;
    joining_date?: string;
}

export const getProfileByTeacherId = async (teacherId: number): Promise<TeacherProfile | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM TeacherProfiles WHERE teacher_id = ?', [teacherId]);
    return (rows[0] as TeacherProfile) || null;
};

export const upsertProfile = async (profile: TeacherProfile): Promise<void> => {
    const existing = await getProfileByTeacherId(profile.teacher_id);
    if (existing) {
        await pool.query(
            'UPDATE TeacherProfiles SET date_of_birth=?, address=?, phone_number=?, qualification=?, experience_years=?, joining_date=? WHERE teacher_id=?',
            [profile.date_of_birth, profile.address, profile.phone_number, profile.qualification, profile.experience_years, profile.joining_date, profile.teacher_id]
        );
    } else {
        await pool.query(
            'INSERT INTO TeacherProfiles (teacher_id, date_of_birth, address, phone_number, qualification, experience_years, joining_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [profile.teacher_id, profile.date_of_birth, profile.address, profile.phone_number, profile.qualification, profile.experience_years, profile.joining_date]
        );
    }
};
