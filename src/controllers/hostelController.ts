import { Request, Response, NextFunction } from 'express';
// Assuming we have a db config exported. If not, I'll use a placeholder or check db config.
// Checking existing controllers might help. For now, I'll assume a standard pool.
import pool from '../config/db';
import { Hostel } from '../models/hostel';
import { Room } from '../models/room';
import { MessMenu } from '../models/messMenu';

export const getAllHostels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows] = await pool.query<Hostel[]>('SELECT * FROM hostels');
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const getHostelRooms = async (req: Request, res: Response, next: NextFunction) => {
    const { hostelId } = req.params;
    try {
        const [rows] = await pool.query<Room[]>('SELECT * FROM rooms WHERE hostel_id = ?', [hostelId]);
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const getMessMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows] = await pool.query<MessMenu[]>('SELECT * FROM mess_menus');
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const allocateRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { studentId, roomId } = req.body;
    try {
        await pool.query('INSERT INTO hostel_allocations (student_id, room_id, allocated_date) VALUES (?, ?, NOW())', [studentId, roomId]);
        // Update room occupancy
        await pool.query('UPDATE rooms SET current_occupancy = current_occupancy + 1 WHERE id = ?', [roomId]);
        res.status(201).json({ message: 'Room allocated successfully' });
    } catch (error) {
        next(error);
    }
};
