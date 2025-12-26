import { Router } from 'express';
import { getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Retrieve all students
router.get('/', verifyToken, getStudents);

// Retrieve a single student with id
router.get('/:id', verifyToken, getStudentById);

// Update a student with id
router.put('/:id', verifyToken, updateStudent);

// Delete a student with id (admin only)
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteStudent);

export default router;
