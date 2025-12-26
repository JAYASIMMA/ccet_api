import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import adminRoutes from './routes/adminRoutes';
import studentProfileRoutes from './routes/studentProfileRoutes';
import examinationRoutes from './routes/examinationRoutes';
import examinationHallRoutes from './routes/examinationHallRoutes';
import classAssignmentRoutes from './routes/classAssignmentRoutes';
import studentAttendanceRoutes from './routes/studentAttendanceRoutes';
import teacherProfileRoutes from './routes/teacherProfileRoutes';
import technicalStaffRoutes from './routes/technicalStaffRoutes';
import nonTechnicalStaffRoutes from './routes/nonTechnicalStaffRoutes';
import transportRoutes from './routes/transportRoutes';
import complaintRoutes from './routes/complaintRoutes';
import userRoutes from './routes/userRoutes';
import labRoutes from './routes/labRoutes';

import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure req.body exists
app.use((req, res, next) => {
    if (!req.body) req.body = {};
    next();
});

// Debug middleware to check what is being received
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} ${req.url}`);
    console.log('Headers:', req.headers['content-type']);
    console.log('Body:', req.body);
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/admins', adminRoutes);
app.use('/student-profiles', studentProfileRoutes);
app.use('/examinations', examinationRoutes);
app.use('/examination-halls', examinationHallRoutes);
app.use('/class-assignments', classAssignmentRoutes);
app.use('/student-attendance', studentAttendanceRoutes);
app.use('/teacher-profiles', teacherProfileRoutes);
app.use('/technical-staff', technicalStaffRoutes);
app.use('/non-technical-staff', nonTechnicalStaffRoutes);
app.use('/transport', transportRoutes);
app.use('/complaints', complaintRoutes);
app.use('/users', userRoutes);
app.use('/labs', labRoutes);


app.get('/', (req, res) => {
    res.send('CCET API is running');
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
