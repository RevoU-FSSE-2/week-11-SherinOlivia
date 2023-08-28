"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConnection_1 = require("./config/dbConnection");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
// DB Connection (Railway)
// DB.connect( function () {
//     if (DB) {
//         console.log("Railway Connection Succeed");
//     } else {
//         console.log("Railway Connection Failed");
//     }
// }),
// DB Connection (Local)
dbConnection_1.DBLocal.connect(function () {
    if (dbConnection_1.DBLocal) {
        console.log("Localhost Connection Succeed");
    }
    else {
        console.log("Localhost Connection Failed");
    }
});
// router
// app.use(router)
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});