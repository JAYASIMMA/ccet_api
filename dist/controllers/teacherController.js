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
exports.deleteTeacher = exports.updateTeacher = exports.getTeacherById = exports.getTeachers = void 0;
const TeacherModel = __importStar(require("../models/teacher"));
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await TeacherModel.getAllTeachers();
        res.json(teachers);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeachers = getTeachers;
const getTeacherById = async (req, res, next) => {
    try {
        const teacher = await TeacherModel.getTeacherById(Number(req.params.id));
        if (!teacher)
            return res.status(404).json({ message: 'Teacher not found' });
        res.json(teacher);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeacherById = getTeacherById;
const updateTeacher = async (req, res, next) => {
    try {
        await TeacherModel.updateTeacher(Number(req.params.id), req.body);
        res.json({ message: 'Teacher updated successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = async (req, res, next) => {
    try {
        await TeacherModel.deleteTeacher(Number(req.params.id));
        res.json({ message: 'Teacher deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTeacher = deleteTeacher;
