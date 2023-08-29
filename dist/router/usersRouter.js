"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userrouter = express_1.default.Router();
const usersController_1 = __importDefault(require("../controller/usersController"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
// Register Account (Reminder: default is cust, admin can register staff)
userrouter.post('/register', usersController_1.default.registerUser);
// Login Account
userrouter.post('/login', usersController_1.default.loginUser);
// Get All User data (Cust, Staff, Admin) ===> Admin Only!
userrouter.get('/', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['admin']), usersController_1.default.getAllUser);
// Get All Cust Data (Cust) ===> Staff & Admin Only!
// userrouter.get('/cust', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getAllCust);
// Get All Staff Data (Staff) ===> Staff & Admin Only!
// userrouter.get('/staff', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getAllStaff);
// Get One Cust Data (Cust) ===> Staff & Admin Only!
// userrouter.get('/cust/:id', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getOneCust);
// Get One Staff Data (Staff) ===> Staff & Admin Only!
// userrouter.get('/staff/:id', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getOneStaff);
// Patch/Update name & address
userrouter.patch('/update/:username', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['cust', 'staff', 'admin']), usersController_1.default.updateUser);
exports.default = userrouter;
