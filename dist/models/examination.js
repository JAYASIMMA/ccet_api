"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExamination = exports.createExamination = exports.getAllExaminations = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllExaminations = async () => {
    const [rows] = await db_1.default.query('SELECT * FROM Examinations');
    return rows;
};
exports.getAllExaminations = getAllExaminations;
const createExamination = async (exam) => {
    const [result] = await db_1.default.query('INSERT INTO Examinations (exam_name, subject_code, exam_date, duration_minutes, total_marks) VALUES (?, ?, ?, ?, ?)', [exam.exam_name, exam.subject_code, exam.exam_date, exam.duration_minutes, exam.total_marks]);
    return result.insertId;
};
exports.createExamination = createExamination;
const deleteExamination = async (id) => {
    await db_1.default.query('DELETE FROM Examinations WHERE id = ?', [id]);
};
exports.deleteExamination = deleteExamination;
