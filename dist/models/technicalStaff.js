"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceByStaffId = exports.markAttendance = exports.upsertProfile = exports.getProfileByStaffId = exports.getAllTechnicalStaff = exports.createTechnicalStaff = exports.getTechnicalStaffByEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTechnicalStaffByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM TechnicalStaff WHERE email = ?', [email]);
    return rows[0] || null;
};
exports.getTechnicalStaffByEmail = getTechnicalStaffByEmail;
const createTechnicalStaff = async (staff) => {
    const [result] = await db_1.default.query('INSERT INTO TechnicalStaff (name, email, password) VALUES (?, ?, ?)', [staff.name, staff.email, staff.password]);
    return result.insertId;
};
exports.createTechnicalStaff = createTechnicalStaff;
const getAllTechnicalStaff = async () => {
    const [rows] = await db_1.default.query('SELECT id, name, email, role FROM TechnicalStaff');
    return rows;
};
exports.getAllTechnicalStaff = getAllTechnicalStaff;
const getProfileByStaffId = async (staffId) => {
    const [rows] = await db_1.default.query('SELECT * FROM TechnicalStaffProfiles WHERE staff_id = ?', [staffId]);
    return rows[0] || null;
};
exports.getProfileByStaffId = getProfileByStaffId;
const upsertProfile = async (profile) => {
    const existing = await (0, exports.getProfileByStaffId)(profile.staff_id);
    if (existing) {
        await db_1.default.query('UPDATE TechnicalStaffProfiles SET date_of_birth=?, address=?, phone_number=?, specialization=? WHERE staff_id=?', [profile.date_of_birth, profile.address, profile.phone_number, profile.specialization, profile.staff_id]);
    }
    else {
        await db_1.default.query('INSERT INTO TechnicalStaffProfiles (staff_id, date_of_birth, address, phone_number, specialization) VALUES (?, ?, ?, ?, ?)', [profile.staff_id, profile.date_of_birth, profile.address, profile.phone_number, profile.specialization]);
    }
};
exports.upsertProfile = upsertProfile;
const markAttendance = async (attendance) => {
    const [existing] = await db_1.default.query('SELECT id FROM TechnicalStaffAttendance WHERE staff_id = ? AND date = ?', [attendance.staff_id, attendance.date]);
    if (existing.length > 0) {
        await db_1.default.query('UPDATE TechnicalStaffAttendance SET status = ?, remarks = ? WHERE id = ?', [attendance.status, attendance.remarks, existing[0].id]);
        return existing[0].id;
    }
    else {
        const [result] = await db_1.default.query('INSERT INTO TechnicalStaffAttendance (staff_id, date, status, remarks) VALUES (?, ?, ?, ?)', [attendance.staff_id, attendance.date, attendance.status, attendance.remarks]);
        return result.insertId;
    }
};
exports.markAttendance = markAttendance;
const getAttendanceByStaffId = async (staffId) => {
    const [rows] = await db_1.default.query('SELECT * FROM TechnicalStaffAttendance WHERE staff_id = ? ORDER BY date DESC', [staffId]);
    return rows;
};
exports.getAttendanceByStaffId = getAttendanceByStaffId;
