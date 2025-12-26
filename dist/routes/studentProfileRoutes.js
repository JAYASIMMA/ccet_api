"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentProfileController_1 = require("../controllers/studentProfileController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Student can view their own profile, maybe admins too
router.get('/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('student'), studentProfileController_1.getProfile);
// Student can update their own profile
router.put('/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('student'), studentProfileController_1.updateProfile);
exports.default = router;
