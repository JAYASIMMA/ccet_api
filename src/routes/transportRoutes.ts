import { Router } from 'express';
import * as Controller from '../controllers/transportController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Allow transport-admin, admin, super-admin to manage transport
const allowedRoles = ['transport-admin', 'admin', 'super-admin'];

router.get('/', verifyToken, authorizeRoles(...allowedRoles), Controller.getAllRecords);
router.post('/', verifyToken, authorizeRoles(...allowedRoles), Controller.createRecord);
router.put('/:id', verifyToken, authorizeRoles(...allowedRoles), Controller.updateRecord);
router.delete('/:id', verifyToken, authorizeRoles(...allowedRoles), Controller.deleteRecord);

export default router;
