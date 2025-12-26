import { Router } from 'express';
import { getAllAssignments, getMyAssignments, createAssignment, deleteAssignment } from '../controllers/classAssignmentController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, authorizeRoles('admin', 'super-admin'), getAllAssignments);
router.get('/my', verifyToken, authorizeRoles('teacher'), getMyAssignments);
router.post('/', verifyToken, authorizeRoles('admin', 'super-admin'), createAssignment);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteAssignment);

export default router;
