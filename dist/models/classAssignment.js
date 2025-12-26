"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.createAssignment = exports.getAssignmentsByTeacher = exports.getAllAssignments = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllAssignments = async () => {
    const [rows] = await db_1.default.query('SELECT * FROM ClassAssignments');
    return rows;
};
exports.getAllAssignments = getAllAssignments;
const getAssignmentsByTeacher = async (teacherId) => {
    const [rows] = await db_1.default.query('SELECT * FROM ClassAssignments WHERE teacher_id = ?', [teacherId]);
    return rows;
};
exports.getAssignmentsByTeacher = getAssignmentsByTeacher;
const createAssignment = async (assignment) => {
    const [result] = await db_1.default.query('INSERT INTO ClassAssignments (teacher_id, subject_name, class_name, day_of_week, time_slot) VALUES (?, ?, ?, ?, ?)', [assignment.teacher_id, assignment.subject_name, assignment.class_name, assignment.day_of_week, assignment.time_slot]);
    return result.insertId;
};
exports.createAssignment = createAssignment;
const deleteAssignment = async (id) => {
    await db_1.default.query('DELETE FROM ClassAssignments WHERE id = ?', [id]);
};
exports.deleteAssignment = deleteAssignment;
