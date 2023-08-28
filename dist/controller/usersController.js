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
        const dbUser = yield dbConnection_1.DBLocal.promise().query(`INSERT INTO week11Milestone2.users (username, password, role) VALUE (${username}, ${hashedPass})`);
        const existedUser = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE username = ${username}`);
        if (existedUser) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exist...!!"));
        }
        else {
            res.status(200).json((0, errorHandling_1.errorHandling)({ id: dbUser[0].insertId, dbUser }, null));
        }
    }
    catch (error) {
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Register User Failed..!! Internal Error!"));
    }
});
// Login Account
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existedUser = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE username = ${username}`);
        const passwordCheck = yield bcrypt_1.default.compare(password, existedUser[0].password);
        if (passwordCheck) {
            const token = jsonwebtoken_1.default.sign({ username: existedUser[0].username, id: existedUser[0].id, role: existedUser[0].role }, jwtConfig_1.default);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: `${existedUser[0].username} Successfully logged in as ${existedUser[0].role}`,
                data: token
            }, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Wrong Username or Password...!! Please Try Again..!!"));
        }
    }
    catch (error) {
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Login Failed..!! Internal Error!"));
    }
});
// Get All User data (Cust, Staff, Admin) ===> Admin Only!
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield dbConnection_1.DBLocal.promise().query('SELECT * FROM week11Milestone2.users');
        if (!allUser) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "User Data Unavailable..."));
        }
        else {
            res.status(200).json((0, errorHandling_1.errorHandling)(allUser, null));
        }
    }
    catch (error) {
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "User Data Retrieval Failed...!!"));
    }
});
// Patch/Update name & address
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, username } = req.user;
        const checkUsername = req.params.username;
        const { name, address } = req.body;
        if ((role !== "staff" && role !== "admin") && username === checkUsername) {
            const updateData = yield dbConnection_1.DBLocal.promise().query(`
            UPDATE week11Milestone2.users
            SET name = ${name}, address = ${address}
            WHERE username = ${username}`);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: "User Data Updated Successfully",
                data: updateData
            }, null));
        }
        else if (role == "staff" || role == "admin") {
            const updateData = yield dbConnection_1.DBLocal.promise().query(`
            UPDATE week11Milestone2.users
            SET name = ${name}, address = ${address}
            WHERE username = ${username}`);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: "User Data Updated Successfully",
                data: updateData
            }, null));
        }
    }
    catch (error) {
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "User Data Update Failed...!!"));
    }
});
const usersController = { registerUser, loginUser, getAllUser, updateUser };
exports.default = usersController;
