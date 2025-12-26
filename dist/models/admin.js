"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.createAdmin = exports.getAdminByEmail = exports.getAllAdmins = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllAdmins = async () => {
    const [rows] = await db_1.default.query('SELECT id, name, email, role FROM Admins');
    return rows;
};
exports.getAllAdmins = getAllAdmins;
const getAdminByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM Admins WHERE email = ?', [email]);
    return rows[0] || null;
};
exports.getAdminByEmail = getAdminByEmail;
const createAdmin = async (admin) => {
    const [result] = await db_1.default.query('INSERT INTO Admins (name, email, role, password) VALUES (?, ?, ?, ?)', [admin.name, admin.email, admin.role, admin.password]);
    return result.insertId;
};
exports.createAdmin = createAdmin;
const deleteAdmin = async (id) => {
    await db_1.default.query('DELETE FROM Admins WHERE id = ?', [id]);
};
exports.deleteAdmin = deleteAdmin;
