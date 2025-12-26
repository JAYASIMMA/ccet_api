# CCET API

Node.js backend API using Express and TypeScript for CCET.

## Setup Guide for XAMPP

If you are using **XAMPP**, follow these steps to run the backend:

### 1. Start XAMPP
1.  Open **XAMPP Control Panel**.
2.  Start **Apache** and **MySQL**.

### 2. Configure Database
1.  Open your browser and go to `http://localhost/phpmyadmin`.
2.  Click **New** in the sidebar to create a new database.
3.  Enter the database name: `ccet_db` and click **Create**.
4.  Select the `ccet_db` database.
5.  Go to the **Import** tab.
6.  Import the SQL files from the `database/` folder in this order:
    1.  `database/001_core_schema.sql` (Creates core tables)
    2.  `database/002_attendance_schema.sql` (Creates attendance tables)
    3.  `database/003_teacher_profile.sql` (Creates teacher profile table)
    4.  `database/004_staff_schema.sql` (Creates staff tables)

### 3. Configure Environment
1.  Open the `.env` file in the project root.
2.  Ensure the configuration matches your XAMPP settings (Default XAMPP password is usually empty):
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=ccet_db
    JWT_SECRET=your_jwt_secret_key
    ```
    *Note: If you have set a password for MySQL in XAMPP, add it to `DB_PASSWORD`.*

### 4. Run the Server
1.  Open a terminal in the project folder (`d:\Vijay1\ccet-api`).
2.  Install dependencies (if new):
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```
4.  The server should start on `http://localhost:3000`.

## API Endpoints Overview
(See code in `src/routes` for full details)

-   **Auth**: `/auth/register`, `/auth/login`
-   **Students**: `/students`, `/student-profiles`, `/student-attendance`
-   **Teachers**: `/teachers`, `/teacher-profiles`
-   **Staff**: `/technical-staff`, `/non-technical-staff`
-   **Academics**: `/examinations`, `/examination-halls`, `/class-assignments`
