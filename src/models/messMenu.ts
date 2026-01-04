import { RowDataPacket } from 'mysql2';

export interface MessMenu extends RowDataPacket {
    id: number;
    day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    breakfast: string;
    lunch: string;
    dinner: string;
}
