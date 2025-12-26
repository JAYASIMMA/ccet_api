"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentByEmail = exports.getStudentById = exports.getAllStudents = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllStudents = async () => {
    const [rows] = await db_1.default.query('SELECT id, name, email, course, year FROM Students');
    return rows;
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (id) => {
    const [rows] = await db_1.default.query('SELECT id, name, email, course, year FROM Students WHERE id = ?', [id]);
    return rows[0] || null;
};
exports.getStudentById = getStudentById;
const getStudentByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM Students WHERE email = ?', [email]);
    return rows[0] || null;
};
exports.getStudentByEmail = getStudentByEmail;
const createStudent = async (student) => {
    const [result] = await db_1.default.query('INSERT INTO Students (name, email, course, year, password) VALUES (?, ?, ?, ?, ?)', [student.name, student.email, student.course, student.year, student.password]);
    return result.insertId;
};
exports.createStudent = createStudent;
const updateStudent = async (id, student) => {
    await db_1.default.query('UPDATE Students SET name = ?, course = ?, year = ? WHERE id = ?', [student.name, student.course, student.year, id]);
};
exports.updateStudent = updateStudent;
// Note: Password update usually handled separately or with care.
const deleteStudent = async (id) => {
    await db_1.default.query('DELETE FROM Students WHERE id = ?', [id]);
};
exports.deleteStudent = deleteStudent;
