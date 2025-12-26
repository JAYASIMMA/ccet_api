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
exports.deleteAssignment = exports.createAssignment = exports.getMyAssignments = exports.getAllAssignments = void 0;
const AssignmentModel = __importStar(require("../models/classAssignment"));
const getAllAssignments = async (req, res, next) => {
    try {
        const assignments = await AssignmentModel.getAllAssignments();
        res.json(assignments);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllAssignments = getAllAssignments;
const getMyAssignments = async (req, res, next) => {
    try {
        const teacherId = req.user?.id;
        if (!teacherId)
            return res.status(400).json({ message: 'User ID missing' });
        const assignments = await AssignmentModel.getAssignmentsByTeacher(teacherId);
        res.json(assignments);
    }
    catch (error) {
        next(error);
    }
};
exports.getMyAssignments = getMyAssignments;
const createAssignment = async (req, res, next) => {
    try {
        const id = await AssignmentModel.createAssignment(req.body);
        res.status(201).json({ message: 'Class Assignment created', id });
    }
    catch (error) {
        next(error);
    }
};
exports.createAssignment = createAssignment;
const deleteAssignment = async (req, res, next) => {
    try {
        await AssignmentModel.deleteAssignment(Number(req.params.id));
        res.json({ message: 'Class Assignment deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAssignment = deleteAssignment;
