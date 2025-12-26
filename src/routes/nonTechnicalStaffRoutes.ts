import { Router } from 'express';
import * as Controller from '../controllers/staffController';

const router = Router();

router.get('/', Controller.getNonTechnicalStaff);
router.post('/', Controller.addNonTechnicalStaff);

export default router;
