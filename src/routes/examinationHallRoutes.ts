import { Router } from 'express';
import { getHalls, createHall, deleteHall } from '../controllers/examinationHallController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getHalls);
router.post('/', verifyToken, authorizeRoles('admin', 'super-admin'), createHall);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteHall);

export default router;
