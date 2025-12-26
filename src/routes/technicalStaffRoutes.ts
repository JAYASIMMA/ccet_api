import { Router } from 'express';
import * as Controller from '../controllers/technicalStaffController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Auth (Admin creates staff usually, or public register?) - Let's stick to admin creating or public register as requested earlier (but usually staff is added by admin). 
// Assuming Admin adds staff or open register for now to match other auth.
router.post('/register', Controller.register); // Or protected
router.post('/login', Controller.login);

// Profile
router.get('/profile/me', verifyToken, authorizeRoles('technical-staff'), Controller.getProfile);
router.put('/profile/me', verifyToken, authorizeRoles('technical-staff'), Controller.updateProfile);

// Attendance
router.post('/attendance', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.markAttendance);
router.get('/attendance/me', verifyToken, authorizeRoles('technical-staff'), Controller.getAttendance);
router.get('/attendance/:id', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.getAttendance);

export default router;
