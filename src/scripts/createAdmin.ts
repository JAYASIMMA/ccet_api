import bcrypt from 'bcryptjs';
import pool from '../config/db';
import { createAdmin, getAdminByEmail } from '../models/admin';
import dotenv from 'dotenv';

dotenv.config();

const createSuperAdmin = async () => {
  const email = 'admin@ccet.com';
  const password = 'adminpassword';
  const name = 'Super Admin';

  try {
    const existing = await getAdminByEmail(email);
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createAdmin({
      name,
      email,
      role: 'super-admin',
      password: hashedPassword
    });

    console.log(`Admin created successfully.\nEmail: ${email}\nPassword: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();
