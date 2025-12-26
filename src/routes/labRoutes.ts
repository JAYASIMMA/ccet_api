import { Router } from 'express';
import * as LabController from '../controllers/labController';

const router = Router();

router.get('/', LabController.getLabs);
router.post('/', LabController.createLab); // Add verifyToken / authorizeRoles later
router.post('/assign-incharge', LabController.assignIncharge);
router.get('/:labId/incharges', LabController.getIncharges);

export default router;
