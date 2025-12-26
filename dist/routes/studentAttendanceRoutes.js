"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentAttendanceController_1 = require("../controllers/studentAttendanceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Mark attendance (Admin/Teacher)
router.post('/', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('admin', 'super-admin', 'teacher'), studentAttendanceController_1.markAttendance);
// View own attendance (Student)
router.get('/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('student'), studentAttendanceController_1.getMyAttendance);
// View specific student's attendance (Admin/Teacher)
router.get('/student/:id', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('admin', 'super-admin', 'teacher'), studentAttendanceController_1.getStudentAttendance);
exports.default = router;
