import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/teacherProfileController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', verifyToken, authorizeRoles('teacher'), getProfile);
router.put('/me', verifyToken, authorizeRoles('teacher'), updateProfile);

export default router;
