import { Router } from 'express';
import * as Controller from '../controllers/nonTechnicalStaffController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Auth
router.post('/register', Controller.register);
router.post('/login', Controller.login);

// Profile
router.get('/profile/me', verifyToken, authorizeRoles('non-technical-staff'), Controller.getProfile);
router.put('/profile/me', verifyToken, authorizeRoles('non-technical-staff'), Controller.updateProfile);

// Attendance
router.post('/attendance', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.markAttendance);
router.get('/attendance/me', verifyToken, authorizeRoles('non-technical-staff'), Controller.getAttendance);
router.get('/attendance/:id', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.getAttendance);

export default router;
