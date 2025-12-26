"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceByStaffId = exports.markAttendance = exports.upsertProfile = exports.getProfileByStaffId = exports.getAllNonTechnicalStaff = exports.createNonTechnicalStaff = exports.getNonTechnicalStaffByEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const getNonTechnicalStaffByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM NonTechnicalStaff WHERE email = ?', [email]);
    return rows[0] || null;
};
exports.getNonTechnicalStaffByEmail = getNonTechnicalStaffByEmail;
const createNonTechnicalStaff = async (staff) => {
    const [result] = await db_1.default.query('INSERT INTO NonTechnicalStaff (name, email, password) VALUES (?, ?, ?)', [staff.name, staff.email, staff.password]);
    return result.insertId;
};
exports.createNonTechnicalStaff = createNonTechnicalStaff;
const getAllNonTechnicalStaff = async () => {
    const [rows] = await db_1.default.query('SELECT id, name, email, role FROM NonTechnicalStaff');
    return rows;
};
exports.getAllNonTechnicalStaff = getAllNonTechnicalStaff;
const getProfileByStaffId = async (staffId) => {
    const [rows] = await db_1.default.query('SELECT * FROM NonTechnicalStaffProfiles WHERE staff_id = ?', [staffId]);
    return rows[0] || null;
};
exports.getProfileByStaffId = getProfileByStaffId;
const upsertProfile = async (profile) => {
    const existing = await (0, exports.getProfileByStaffId)(profile.staff_id);
    if (existing) {
        await db_1.default.query('UPDATE NonTechnicalStaffProfiles SET date_of_birth=?, address=?, phone_number=?, designation=? WHERE staff_id=?', [profile.date_of_birth, profile.address, profile.phone_number, profile.designation, profile.staff_id]);
    }
    else {
        await db_1.default.query('INSERT INTO NonTechnicalStaffProfiles (staff_id, date_of_birth, address, phone_number, designation) VALUES (?, ?, ?, ?, ?)', [profile.staff_id, profile.date_of_birth, profile.address, profile.phone_number, profile.designation]);
    }
};
exports.upsertProfile = upsertProfile;
const markAttendance = async (attendance) => {
    const [existing] = await db_1.default.query('SELECT id FROM NonTechnicalStaffAttendance WHERE staff_id = ? AND date = ?', [attendance.staff_id, attendance.date]);
    if (existing.length > 0) {
        await db_1.default.query('UPDATE NonTechnicalStaffAttendance SET status = ?, remarks = ? WHERE id = ?', [attendance.status, attendance.remarks, existing[0].id]);
        return existing[0].id;
    }
    else {
        const [result] = await db_1.default.query('INSERT INTO NonTechnicalStaffAttendance (staff_id, date, status, remarks) VALUES (?, ?, ?, ?)', [attendance.staff_id, attendance.date, attendance.status, attendance.remarks]);
        return result.insertId;
    }
};
exports.markAttendance = markAttendance;
const getAttendanceByStaffId = async (staffId) => {
    const [rows] = await db_1.default.query('SELECT * FROM NonTechnicalStaffAttendance WHERE staff_id = ? ORDER BY date DESC', [staffId]);
    return rows;
};
exports.getAttendanceByStaffId = getAttendanceByStaffId;
