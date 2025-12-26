"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceByDate = exports.getAttendanceByStudentId = exports.markAttendance = void 0;
const db_1 = __importDefault(require("../config/db"));
const markAttendance = async (attendance) => {
    // Check if attendance already exists for this student on this date AND period
    const query = 'SELECT id FROM StudentAttendance WHERE student_id = ? AND date = ? AND period = ?';
    const params = [attendance.student_id, attendance.date, attendance.period];
    const [existing] = await db_1.default.query(query, params);
    if (existing.length > 0) {
        // Update existing
        await db_1.default.query('UPDATE StudentAttendance SET status = ?, remarks = ?, subject_id = ? WHERE id = ?', [attendance.status, attendance.remarks, attendance.subject_id || null, existing[0].id]);
        return existing[0].id;
    }
    else {
        // Insert new
        const [result] = await db_1.default.query('INSERT INTO StudentAttendance (student_id, date, period, subject_id, status, remarks) VALUES (?, ?, ?, ?, ?, ?)', [attendance.student_id, attendance.date, attendance.period, attendance.subject_id || null, attendance.status, attendance.remarks]);
        return result.insertId;
    }
};
exports.markAttendance = markAttendance;
const getAttendanceByStudentId = async (studentId) => {
    const [rows] = await db_1.default.query('SELECT * FROM StudentAttendance WHERE student_id = ? ORDER BY date DESC, period ASC', [studentId]);
    return rows;
};
exports.getAttendanceByStudentId = getAttendanceByStudentId;
const getAttendanceByDate = async (date) => {
    const [rows] = await db_1.default.query('SELECT * FROM StudentAttendance WHERE date = ?', [date]);
    return rows;
};
exports.getAttendanceByDate = getAttendanceByDate;
