"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigLocal = exports.DBConfig = void 0;
exports.DBConfig = {
    URL: process.env.SQL_URL,
};
// local
exports.DBConfigLocal = {
    HOST: process.env.SQL_HOSTLOCAL,
    USER: process.env.SQL_USERNAMELOCAL,
    PASSWORD: process.env.SQL_PASSWORDLOCAL,
    DATABASE: process.env.SQL_DATABASELOCAL,
};
