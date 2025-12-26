import { Router } from 'express';
import * as Controller from '../controllers/staffController';

const router = Router();

router.get('/', Controller.getTechnicalStaff);
router.post('/', Controller.addTechnicalStaff);

export default router;
