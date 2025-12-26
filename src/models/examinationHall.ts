import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface ExaminationHall {
    id?: number;
    hall_name: string;
    capacity: number;
    location: string;
}

export const getAllHalls = async (): Promise<ExaminationHall[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM ExaminationHalls');
    return rows as ExaminationHall[];
};

export const createHall = async (hall: ExaminationHall): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO ExaminationHalls (hall_name, capacity, location) VALUES (?, ?, ?)',
        [hall.hall_name, hall.capacity, hall.location]
    );
    return (result as any).insertId;
};

export const deleteHall = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM ExaminationHalls WHERE id = ?', [id]);
};
