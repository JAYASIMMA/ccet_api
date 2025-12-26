"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProfile = exports.getProfileByStudentId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getProfileByStudentId = async (studentId) => {
    const [rows] = await db_1.default.query('SELECT * FROM StudentProfiles WHERE student_id = ?', [studentId]);
    return rows[0] || null;
};
exports.getProfileByStudentId = getProfileByStudentId;
const upsertProfile = async (profile) => {
    const existing = await (0, exports.getProfileByStudentId)(profile.student_id);
    if (existing) {
        await db_1.default.query('UPDATE StudentProfiles SET date_of_birth=?, address=?, phone_number=?, guardian_name=?, guardian_phone=? WHERE student_id=?', [profile.date_of_birth, profile.address, profile.phone_number, profile.guardian_name, profile.guardian_phone, profile.student_id]);
    }
    else {
        await db_1.default.query('INSERT INTO StudentProfiles (student_id, date_of_birth, address, phone_number, guardian_name, guardian_phone) VALUES (?, ?, ?, ?, ?, ?)', [profile.student_id, profile.date_of_birth, profile.address, profile.phone_number, profile.guardian_name, profile.guardian_phone]);
    }
};
exports.upsertProfile = upsertProfile;
