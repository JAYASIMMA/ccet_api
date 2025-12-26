"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller = __importStar(require("../controllers/technicalStaffController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Auth (Admin creates staff usually, or public register?) - Let's stick to admin creating or public register as requested earlier (but usually staff is added by admin). 
// Assuming Admin adds staff or open register for now to match other auth.
router.post('/register', Controller.register); // Or protected
router.post('/login', Controller.login);
// Profile
router.get('/profile/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('technical-staff'), Controller.getProfile);
router.put('/profile/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('technical-staff'), Controller.updateProfile);
// Attendance
router.post('/attendance', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('admin', 'super-admin'), Controller.markAttendance);
router.get('/attendance/me', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('technical-staff'), Controller.getAttendance);
router.get('/attendance/:id', authMiddleware_1.verifyToken, (0, authMiddleware_1.authorizeRoles)('admin', 'super-admin'), Controller.getAttendance);
exports.default = router;
