import { RowDataPacket } from 'mysql2';

export interface HostelAllocation extends RowDataPacket {
    id: number;
    student_id: number;
    room_id: number;
    allocated_date: Date;
}
