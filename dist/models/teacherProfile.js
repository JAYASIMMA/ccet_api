"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProfile = exports.getProfileByTeacherId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getProfileByTeacherId = async (teacherId) => {
    const [rows] = await db_1.default.query('SELECT * FROM TeacherProfiles WHERE teacher_id = ?', [teacherId]);
    return rows[0] || null;
};
exports.getProfileByTeacherId = getProfileByTeacherId;
const upsertProfile = async (profile) => {
    const existing = await (0, exports.getProfileByTeacherId)(profile.teacher_id);
    if (existing) {
        await db_1.default.query('UPDATE TeacherProfiles SET date_of_birth=?, address=?, phone_number=?, qualification=?, experience_years=?, joining_date=? WHERE teacher_id=?', [profile.date_of_birth, profile.address, profile.phone_number, profile.qualification, profile.experience_years, profile.joining_date, profile.teacher_id]);
    }
    else {
        await db_1.default.query('INSERT INTO TeacherProfiles (teacher_id, date_of_birth, address, phone_number, qualification, experience_years, joining_date) VALUES (?, ?, ?, ?, ?, ?, ?)', [profile.teacher_id, profile.date_of_birth, profile.address, profile.phone_number, profile.qualification, profile.experience_years, profile.joining_date]);
    }
};
exports.upsertProfile = upsertProfile;
