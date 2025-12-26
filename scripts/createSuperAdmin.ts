import pool from '../src/config/db';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    const email = 'admin@ccet.com';
    const password = 'admin'; // Default password
    const name = 'Super Admin';
    const role = 'super-admin';

    // Check if admin exists
    const [existing] = await pool.query<RowDataPacket[]>('SELECT * FROM Admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO Admins (name, email, role, password) VALUES (?, ?, ?, ?)',
      [name, email, role, hashedPassword]
    );

    console.log(`Super Admin created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();
