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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendance = exports.markAttendance = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const StaffModel = __importStar(require("../models/nonTechnicalStaff"));
const JWT_SECRET = process.env.JWT_SECRET || 'secretString';
// Auth
const register = async (req, res, next) => {
    try {
        const { password, ...data } = req.body;
        const existing = await StaffModel.getNonTechnicalStaffByEmail(data.email);
        if (existing)
            return res.status(400).json({ message: 'Email already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await StaffModel.createNonTechnicalStaff({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Non-Technical Staff registered successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await StaffModel.getNonTechnicalStaffByEmail(email);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: 'non-technical-staff', email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: 'non-technical-staff' } });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// Profile
const getProfile = async (req, res, next) => {
    try {
        const staffId = req.params.id ? Number(req.params.id) : req.user?.id;
        if (!staffId)
            return res.status(400).json({ message: 'ID missing' });
        const profile = await StaffModel.getProfileByStaffId(staffId);
        if (!profile)
            return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const staffId = req.user?.id;
        if (!staffId)
            return res.status(400).json({ message: 'ID missing' });
        await StaffModel.upsertProfile({ ...req.body, staff_id: staffId });
        res.json({ message: 'Profile updated' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
// Attendance
const markAttendance = async (req, res, next) => {
    try {
        const { staff_id, date, status, remarks } = req.body;
        await StaffModel.markAttendance({ staff_id, date, status, remarks });
        res.json({ message: 'Attendance recorded' });
    }
    catch (error) {
        next(error);
    }
};
exports.markAttendance = markAttendance;
const getAttendance = async (req, res, next) => {
    try {
        const staffId = req.params.id ? Number(req.params.id) : req.user?.id;
        const attendance = await StaffModel.getAttendanceByStaffId(Number(staffId));
        res.json(attendance);
    }
    catch (error) {
        next(error);
    }
};
exports.getAttendance = getAttendance;
