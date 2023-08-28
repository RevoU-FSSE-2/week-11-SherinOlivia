"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.errorHandling = void 0;
const dbConnection_1 = require("../config/dbConnection");
const errorHandling = function (data, error) {
    if (error) {
        return {
            success: false,
            error: error
        };
    }
    return {
        success: true,
        data: data
    };
};
exports.errorHandling = errorHandling;
const query = (query, values) => {
    return new Promise((resolve, reject) => {
        dbConnection_1.DBLocal.query(query, values, (err, result, fields) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.query = query;
