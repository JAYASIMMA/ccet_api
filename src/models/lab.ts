import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface Lab {
    id?: number;
    name: string;
    location?: string;
}

export interface LabIncharge {
    id?: number;
    lab_id: number;
    staff_id: number;
    staff_type: 'teacher' | 'technical';
    is_active: boolean;
    assigned_at?: Date;
}

export const getAllLabs = async (): Promise<Lab[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Labs');
    return rows as Lab[];
};

export const createLab = async (lab: Lab): Promise<number> => {
    const [result] = await pool.query('INSERT INTO Labs (name, location) VALUES (?, ?)', [lab.name, lab.location]);
    return (result as any).insertId;
};

export const assignLabIncharge = async (incharge: LabIncharge): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO LabIncharges (lab_id, staff_id, staff_type, is_active) VALUES (?, ?, ?, ?)',
        [incharge.lab_id, incharge.staff_id, incharge.staff_type, incharge.is_active || true]
    );
    return (result as any).insertId;
};

export const getLabIncharges = async (labId: number): Promise<any[]> => {
    // This query is tricky as it needs to join with either Teachers or TechnicalStaff based on type
    // We will fetch incharges and then populate names in a separate logic or use a UNION if strictly SQL needed
    // For simplicity here, we return the raw mapping
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM LabIncharges WHERE lab_id = ? AND is_active = TRUE', [labId]);
    return rows as any[];
};
