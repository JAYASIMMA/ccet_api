import { Router } from 'express';
import { getAllUsers, createUser, deleteUser, updateUserStatus } from '../controllers/userController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Protect all routes - Admin only
router.use(verifyToken);
// authorizeRoles('admin', 'super-admin') can be added per route

router.get('/', authorizeRoles('admin', 'super-admin'), getAllUsers);
router.post('/', authorizeRoles('admin', 'super-admin'), createUser);
router.delete('/:id', authorizeRoles('admin', 'super-admin'), deleteUser);
router.patch('/:id/status', authorizeRoles('admin', 'super-admin'), updateUserStatus);

export default router;
