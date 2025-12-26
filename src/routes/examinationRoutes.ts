import { Router } from 'express';
import { getExams, createExam, deleteExam } from '../controllers/examinationController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getExams);
router.post('/', verifyToken, authorizeRoles('admin', 'super-admin'), createExam);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteExam);

export default router;
