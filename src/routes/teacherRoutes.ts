import { Router } from 'express';
import { getTeachers, getTeacherById, updateTeacher, deleteTeacher } from '../controllers/teacherController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getTeachers);
router.get('/:id', verifyToken, getTeacherById);
router.put('/:id', verifyToken, updateTeacher);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteTeacher);

export default router;
