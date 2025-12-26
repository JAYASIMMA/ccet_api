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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.addAdmin = exports.getAdmins = void 0;
const AdminModel = __importStar(require("../models/admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAdmins = async (req, res, next) => {
    try {
        const admins = await AdminModel.getAllAdmins();
        res.json(admins);
    }
    catch (error) {
        next(error);
    }
};
exports.getAdmins = getAdmins;
const addAdmin = async (req, res, next) => {
    try {
        const { password, ...data } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await AdminModel.createAdmin({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'Admin created successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.addAdmin = addAdmin;
const deleteAdmin = async (req, res, next) => {
    try {
        await AdminModel.deleteAdmin(Number(req.params.id));
        res.json({ message: 'Admin deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAdmin = deleteAdmin;
