import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface NonTechnicalStaff {
    id?: number;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

export const getNonTechnicalStaffByEmail = async (email: string): Promise<NonTechnicalStaff | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM NonTechnicalStaff WHERE email = ?', [email]);
    return (rows[0] as NonTechnicalStaff) || null;
};

export const createNonTechnicalStaff = async (staff: NonTechnicalStaff): Promise<number> => {
    const [result] = await pool.query('INSERT INTO NonTechnicalStaff (name, email, password) VALUES (?, ?, ?)',
        [staff.name, staff.email, staff.password]);
    return (result as any).insertId;
};

export const getAllNonTechnicalStaff = async (): Promise<NonTechnicalStaff[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM NonTechnicalStaff');
    return rows as NonTechnicalStaff[];
};

// Profile
export interface NonTechnicalStaffProfile {
    id?: number;
    staff_id: number;
    date_of_birth?: string;
    address?: string;
    phone_number?: string;
    designation?: string;
}

export const getProfileByStaffId = async (staffId: number): Promise<NonTechnicalStaffProfile | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM NonTechnicalStaffProfiles WHERE staff_id = ?', [staffId]);
    return (rows[0] as NonTechnicalStaffProfile) || null;
};

export const upsertProfile = async (profile: NonTechnicalStaffProfile): Promise<void> => {
    const existing = await getProfileByStaffId(profile.staff_id);
    if (existing) {
        await pool.query(
            'UPDATE NonTechnicalStaffProfiles SET date_of_birth=?, address=?, phone_number=?, designation=? WHERE staff_id=?',
            [profile.date_of_birth, profile.address, profile.phone_number, profile.designation, profile.staff_id]
        );
    } else {
        await pool.query(
            'INSERT INTO NonTechnicalStaffProfiles (staff_id, date_of_birth, address, phone_number, designation) VALUES (?, ?, ?, ?, ?)',
            [profile.staff_id, profile.date_of_birth, profile.address, profile.phone_number, profile.designation]
        );
    }
};

// Attendance
export interface NonTechnicalStaffAttendance {
    id?: number;
    staff_id: number;
    date: string;
    status: 'Present' | 'Absent' | 'Late' | 'Leave';
    remarks?: string;
}

export const markAttendance = async (attendance: NonTechnicalStaffAttendance): Promise<number> => {
    const [existing] = await pool.query<RowDataPacket[]>(
        'SELECT id FROM NonTechnicalStaffAttendance WHERE staff_id = ? AND date = ?',
        [attendance.staff_id, attendance.date]
    );

    if (existing.length > 0) {
        await pool.query(
            'UPDATE NonTechnicalStaffAttendance SET status = ?, remarks = ? WHERE id = ?',
            [attendance.status, attendance.remarks, existing[0].id]
        );
        return existing[0].id;
    } else {
        const [result] = await pool.query(
            'INSERT INTO NonTechnicalStaffAttendance (staff_id, date, status, remarks) VALUES (?, ?, ?, ?)',
            [attendance.staff_id, attendance.date, attendance.status, attendance.remarks]
        );
        return (result as any).insertId;
    }
};

export const getAttendanceByStaffId = async (staffId: number): Promise<NonTechnicalStaffAttendance[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM NonTechnicalStaffAttendance WHERE staff_id = ? ORDER BY date DESC', [staffId]);
    return rows as NonTechnicalStaffAttendance[];
};
