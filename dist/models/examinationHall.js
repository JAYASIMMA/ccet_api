"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHall = exports.createHall = exports.getAllHalls = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllHalls = async () => {
    const [rows] = await db_1.default.query('SELECT * FROM ExaminationHalls');
    return rows;
};
exports.getAllHalls = getAllHalls;
const createHall = async (hall) => {
    const [result] = await db_1.default.query('INSERT INTO ExaminationHalls (hall_name, capacity, location) VALUES (?, ?, ?)', [hall.hall_name, hall.capacity, hall.location]);
    return result.insertId;
};
exports.createHall = createHall;
const deleteHall = async (id) => {
    await db_1.default.query('DELETE FROM ExaminationHalls WHERE id = ?', [id]);
};
exports.deleteHall = deleteHall;
