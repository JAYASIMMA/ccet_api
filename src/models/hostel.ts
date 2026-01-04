import { RowDataPacket } from 'mysql2';

export interface Hostel extends RowDataPacket {
    id: number;
    name: string;
    type: 'Boys' | 'Girls';
    warden_contact: string;
}
