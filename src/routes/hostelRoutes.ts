import { Router } from 'express';
import { getAllHostels, getHostelRooms, getMessMenu, allocateRoom } from '../controllers/hostelController';

const router = Router();

router.get('/', getAllHostels);
router.get('/:hostelId/rooms', getHostelRooms);
router.get('/mess-menu', getMessMenu);
router.post('/allocate', allocateRoom);

export default router;
