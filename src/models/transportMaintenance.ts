import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface TransportMaintenance {
    id?: number;
    vehicle_number: string;
    driver_id: number;
    driver_name?: string; // For display
    last_service_date?: string;
    next_service_date?: string;
    status: 'Active' | 'Maintenance' | 'Inactive';
    remarks?: string;
    created_at?: string;
}

export const getAllRecords = async (): Promise<TransportMaintenance[]> => {
    const query = `
    SELECT t.*, s.name as driver_name 
    FROM TransportMaintenance t 
    JOIN NonTechnicalStaff s ON t.driver_id = s.id 
    ORDER BY t.next_service_date ASC
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as TransportMaintenance[];
};

export const createRecord = async (record: TransportMaintenance): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO TransportMaintenance (vehicle_number, driver_id, last_service_date, next_service_date, status, remarks) VALUES (?, ?, ?, ?, ?, ?)',
        [record.vehicle_number, record.driver_id, record.last_service_date, record.next_service_date, record.status, record.remarks]
    );
    return (result as any).insertId;
};

export const updateRecord = async (id: number, record: TransportMaintenance): Promise<void> => {
    await pool.query(
        'UPDATE TransportMaintenance SET vehicle_number=?, driver_id=?, last_service_date=?, next_service_date=?, status=?, remarks=? WHERE id=?',
        [record.vehicle_number, record.driver_id, record.last_service_date, record.next_service_date, record.status, record.remarks, id]
    );
};

export const deleteRecord = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM TransportMaintenance WHERE id = ?', [id]);
};
