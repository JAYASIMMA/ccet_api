"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherProfileController_1 = require("../controllers/teacherProfileController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('teacher'), teacherProfileController_1.getProfile);
router.put('/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('teacher'), teacherProfileController_1.updateProfile);
exports.default = router;
