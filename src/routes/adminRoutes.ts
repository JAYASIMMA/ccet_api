import { Router } from 'express';
import { getAdmins, addAdmin, deleteAdmin } from '../controllers/adminController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getAdmins);
router.post('/', verifyToken, authorizeRoles('super-admin'), addAdmin);
router.delete('/:id', verifyToken, authorizeRoles('super-admin'), deleteAdmin);

export default router;
