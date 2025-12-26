"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const studentProfileRoutes_1 = __importDefault(require("./routes/studentProfileRoutes"));
const examinationRoutes_1 = __importDefault(require("./routes/examinationRoutes"));
const examinationHallRoutes_1 = __importDefault(require("./routes/examinationHallRoutes"));
const classAssignmentRoutes_1 = __importDefault(require("./routes/classAssignmentRoutes"));
const studentAttendanceRoutes_1 = __importDefault(require("./routes/studentAttendanceRoutes"));
const teacherProfileRoutes_1 = __importDefault(require("./routes/teacherProfileRoutes"));
const technicalStaffRoutes_1 = __importDefault(require("./routes/technicalStaffRoutes"));
const nonTechnicalStaffRoutes_1 = __importDefault(require("./routes/nonTechnicalStaffRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/students', studentRoutes_1.default);
app.use('/teachers', teacherRoutes_1.default);
app.use('/admins', adminRoutes_1.default);
app.use('/student-profiles', studentProfileRoutes_1.default);
app.use('/examinations', examinationRoutes_1.default);
app.use('/examination-halls', examinationHallRoutes_1.default);
app.use('/class-assignments', classAssignmentRoutes_1.default);
app.use('/student-attendance', studentAttendanceRoutes_1.default);
app.use('/teacher-profiles', teacherProfileRoutes_1.default);
app.use('/technical-staff', technicalStaffRoutes_1.default);
app.use('/non-technical-staff', nonTechnicalStaffRoutes_1.default);
app.get('/', (req, res) => {
    res.send('CCET API is running');
});
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
