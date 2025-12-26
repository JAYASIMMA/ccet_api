import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

// Technical Staff Auth
export interface TechnicalStaff {
    id?: number;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

export const getTechnicalStaffByEmail = async (email: string): Promise<TechnicalStaff | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM TechnicalStaff WHERE email = ?', [email]);
    return (rows[0] as TechnicalStaff) || null;
};

export const createTechnicalStaff = async (staff: TechnicalStaff): Promise<number> => {
    const [result] = await pool.query('INSERT INTO TechnicalStaff (name, email, password) VALUES (?, ?, ?)',
        [staff.name, staff.email, staff.password]);
    return (result as any).insertId;
};

export const getAllTechnicalStaff = async (): Promise<TechnicalStaff[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM TechnicalStaff');
    return rows as TechnicalStaff[];
};

// Profile
export interface TechnicalStaffProfile {
    id?: number;
    staff_id: number;
    date_of_birth?: string;
    address?: string;
    phone_number?: string;
    specialization?: string;
}

export const getProfileByStaffId = async (staffId: number): Promise<TechnicalStaffProfile | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM TechnicalStaffProfiles WHERE staff_id = ?', [staffId]);
    return (rows[0] as TechnicalStaffProfile) || null;
};

export const upsertProfile = async (profile: TechnicalStaffProfile): Promise<void> => {
    const existing = await getProfileByStaffId(profile.staff_id);
    if (existing) {
        await pool.query(
            'UPDATE TechnicalStaffProfiles SET date_of_birth=?, address=?, phone_number=?, specialization=? WHERE staff_id=?',
            [profile.date_of_birth, profile.address, profile.phone_number, profile.specialization, profile.staff_id]
        );
    } else {
        await pool.query(
            'INSERT INTO TechnicalStaffProfiles (staff_id, date_of_birth, address, phone_number, specialization) VALUES (?, ?, ?, ?, ?)',
            [profile.staff_id, profile.date_of_birth, profile.address, profile.phone_number, profile.specialization]
        );
    }
};

// Attendance
export interface TechnicalStaffAttendance {
    id?: number;
    staff_id: number;
    date: string;
    status: 'Present' | 'Absent' | 'Late' | 'Leave';
    remarks?: string;
}

export const markAttendance = async (attendance: TechnicalStaffAttendance): Promise<number> => {
    const [existing] = await pool.query<RowDataPacket[]>(
        'SELECT id FROM TechnicalStaffAttendance WHERE staff_id = ? AND date = ?',
        [attendance.staff_id, attendance.date]
    );

    if (existing.length > 0) {
        await pool.query(
            'UPDATE TechnicalStaffAttendance SET status = ?, remarks = ? WHERE id = ?',
            [attendance.status, attendance.remarks, existing[0].id]
        );
        return existing[0].id;
    } else {
        const [result] = await pool.query(
            'INSERT INTO TechnicalStaffAttendance (staff_id, date, status, remarks) VALUES (?, ?, ?, ?)',
            [attendance.staff_id, attendance.date, attendance.status, attendance.remarks]
        );
        return (result as any).insertId;
    }
};

export const getAttendanceByStaffId = async (staffId: number): Promise<TechnicalStaffAttendance[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM TechnicalStaffAttendance WHERE staff_id = ? ORDER BY date DESC', [staffId]);
    return rows as TechnicalStaffAttendance[];
};
