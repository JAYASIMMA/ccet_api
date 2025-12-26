"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacherByEmail = exports.getTeacherById = exports.getAllTeachers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllTeachers = async () => {
    const [rows] = await db_1.default.query('SELECT id, name, email, department, subject FROM Teachers');
    return rows;
};
exports.getAllTeachers = getAllTeachers;
const getTeacherById = async (id) => {
    const [rows] = await db_1.default.query('SELECT id, name, email, department, subject FROM Teachers WHERE id = ?', [id]);
    return rows[0] || null;
};
exports.getTeacherById = getTeacherById;
const getTeacherByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM Teachers WHERE email = ?', [email]);
    return rows[0] || null;
};
exports.getTeacherByEmail = getTeacherByEmail;
const createTeacher = async (teacher) => {
    const [result] = await db_1.default.query('INSERT INTO Teachers (name, email, department, subject, password) VALUES (?, ?, ?, ?, ?)', [teacher.name, teacher.email, teacher.department, teacher.subject, teacher.password]);
    return result.insertId;
};
exports.createTeacher = createTeacher;
const updateTeacher = async (id, teacher) => {
    await db_1.default.query('UPDATE Teachers SET name = ?, department = ?, subject = ? WHERE id = ?', [teacher.name, teacher.department, teacher.subject, id]);
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = async (id) => {
    await db_1.default.query('DELETE FROM Teachers WHERE id = ?', [id]);
};
exports.deleteTeacher = deleteTeacher;
