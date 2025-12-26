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
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getStudents = void 0;
const StudentModel = __importStar(require("../models/student"));
// Students
const getStudents = async (req, res, next) => {
    try {
        const students = await StudentModel.getAllStudents();
        res.json(students);
    }
    catch (error) {
        next(error);
    }
};
exports.getStudents = getStudents;
const getStudentById = async (req, res, next) => {
    try {
        const student = await StudentModel.getStudentById(Number(req.params.id));
        if (!student)
            return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    }
    catch (error) {
        next(error);
    }
};
exports.getStudentById = getStudentById;
const updateStudent = async (req, res, next) => {
    try {
        await StudentModel.updateStudent(Number(req.params.id), req.body);
        res.json({ message: 'Student updated successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res, next) => {
    try {
        await StudentModel.deleteStudent(Number(req.params.id));
        res.json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStudent = deleteStudent;
