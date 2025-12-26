import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/studentProfileController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Student can view their own profile, maybe admins too
router.get('/me', verifyToken, authorizeRoles('student'), getProfile);

// Student can update their own profile
router.put('/me', verifyToken, authorizeRoles('student'), updateProfile);

export default router;
