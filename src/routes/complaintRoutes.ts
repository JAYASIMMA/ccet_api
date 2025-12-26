import { Router } from 'express';
import * as Controller from '../controllers/complaintController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Submit & View Own (All authenticated users)
router.post('/', verifyToken, Controller.createComplaint);
router.get('/my', verifyToken, Controller.getMyComplaints);

// Admin View & Manage
router.get('/', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.getAllComplaints);
router.put('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), Controller.updateStatus);

export default router;
