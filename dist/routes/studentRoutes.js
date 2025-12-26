"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Retrieve all students
router.get('/', authMiddleware_1.verifyToken, studentController_1.getStudents);
// Retrieve a single student with id
router.get('/:id', authMiddleware_1.verifyToken, studentController_1.getStudentById);
// Update a student with id
router.put('/:id', authMiddleware_1.verifyToken, studentController_1.updateStudent);
// Delete a student with id (admin only)
router.delete('/:id', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('admin', 'super-admin'), studentController_1.deleteStudent);
exports.default = router;
