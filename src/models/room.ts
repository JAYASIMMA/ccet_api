import { RowDataPacket } from 'mysql2';

export interface Room extends RowDataPacket {
    id: number;
    hostel_id: number;
    room_number: string;
    capacity: number;
    current_occupancy: number;
}
