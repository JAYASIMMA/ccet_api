import pool from '../config/db';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

dotenv.config();

const viewAdmins = async () => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM Admins');
        console.log('--- Admins Table Data ---');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('Error fetching admins:', error);
        process.exit(1);
    }
};

viewAdmins();
