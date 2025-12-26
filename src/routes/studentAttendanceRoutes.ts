import { Router } from 'express';
import { markAttendance, getMyAttendance, getStudentAttendance } from '../controllers/studentAttendanceController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Mark attendance (Admin/Teacher)
router.post('/', verifyToken, authorizeRoles('admin', 'super-admin', 'teacher'), markAttendance);

// View own attendance (Student)
router.get('/me', verifyToken, authorizeRoles('student'), getMyAttendance);

// View specific student's attendance (Admin/Teacher)
router.get('/student/:id', verifyToken, authorizeRoles('admin', 'super-admin', 'teacher'), getStudentAttendance);

export default router;
