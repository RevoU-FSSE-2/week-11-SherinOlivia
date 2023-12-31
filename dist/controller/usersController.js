"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getAllCust = exports.getAllUser = exports.loginUser = exports.registerUser = void 0;
const dbConnection_1 = require("../config/dbConnection");
const errorHandling_1 = require("./errorHandling");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = __importDefault(require("../config/jwtConfig"));
// Register Account (Reminder: default is cust, admin can register staff)
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const [existingUser] = yield dbConnection_1.DB.promise().query(`SELECT * FROM railway.users WHERE username = ?`, [username]);
        if (req.role = "admin") {
            console.log(req.role, "<=== test check role");
            if (existingUser.length === 0) {
                const [newUser] = yield dbConnection_1.DB.promise().query(`INSERT INTO railway.users (username, password, role) VALUES (?, ?, ?)`, [username, hashedPass, role]);
                const getNewUser = yield dbConnection_1.DB.promise().query(`SELECT * FROM railway.users WHERE id = ?`, [newUser.insertId]);
                res.status(200).json((0, errorHandling_1.errorHandling)(getNewUser[0], null));
            }
            else {
                res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exist...!!"));
                return;
            }
        }
        else {
            if (existingUser.length === 0) {
                const [newUser] = yield dbConnection_1.DB.promise().query(`INSERT INTO railway.users (username, password, role) VALUES (?, ?, ?)`, [username, hashedPass, 'cust']);
                const getNewUser = yield dbConnection_1.DB.promise().query(`SELECT * FROM railway.users WHERE id = ?`, [newUser.insertId]);
                res.status(200).json((0, errorHandling_1.errorHandling)(getNewUser[0], null));
            }
            else {
                res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exist...!!"));
                return;
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Register User Failed..!! Internal Error!"));
    }
});
exports.registerUser = registerUser;
// Login Account
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield dbConnection_1.DB.promise().query("SELECT * FROM railway.users WHERE username = ?", [username]);
        const user = existingUser[0][0];
        console.log(user, "password:", user.password);
        const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
        if (passwordCheck) {
            const token = jsonwebtoken_1.default.sign({ username: user.username, id: user.id, role: user.role }, jwtConfig_1.default);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: `${user.username} Successfully logged in as ${user.role}`,
                data: token
            }, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)('Password is incorrect', null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)('Cannot Connect!! Internal Error!', null));
    }
});
exports.loginUser = loginUser;
// Get All User data (Cust, Staff, Admin) ===> Admin Only!
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield dbConnection_1.DB.promise().query('SELECT * FROM railway.users');
        if (!allUser) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "User Data Unavailable..."));
        }
        else {
            res.status(200).json((0, errorHandling_1.errorHandling)(allUser[0], null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "User Data Retrieval Failed...!!"));
    }
});
exports.getAllUser = getAllUser;
// get all cust data (cust) ===> Staff & Admin only!
const getAllCust = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield dbConnection_1.DB.promise().query('SELECT * FROM railway.users WHERE role = ?', ["cust"]);
        res.status(200).json((0, errorHandling_1.errorHandling)(usersData[0], null));
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "User Data Retrieval Failed...!!"));
    }
});
exports.getAllCust = getAllCust;
// Patch/Update name & address
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.user;
        const checkId = req.params.id;
        const { name, address } = req.body;
        if ((role !== "staff" && role !== "admin") && id == checkId) {
            yield dbConnection_1.DB.promise().query(`
                UPDATE railway.users
                SET name = ?, address = ?
                WHERE id = ?`, [name, address, id]);
            const updatedData = yield dbConnection_1.DB.promise().query(`
                SELECT * FROM railway.users
                WHERE id = ?`, [checkId]);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: "User Data Updated Successfully",
                data: updatedData[0]
            }, null));
        }
        else if (role == "staff" || role == "admin") {
            yield dbConnection_1.DB.promise().query(`
                UPDATE railway.users
                SET name = ?, address = ?
                WHERE id = ?`, [name, address, checkId]);
            const updatedData = yield dbConnection_1.DB.promise().query(`
                SELECT * FROM railway.users
                WHERE id = ?`, [checkId]);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: "User Data Updated Successfully",
                data: updatedData[0]
            }, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Unauthorized Update...!! Update Failed!!"));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "User Data Update Failed...!!"));
    }
});
exports.updateUser = updateUser;
