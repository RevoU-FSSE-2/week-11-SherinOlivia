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
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../config/dbConnection");
const errorHandling_1 = require("./errorHandling");
// Create new Product
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, qty, price } = req.body;
        const [existingProduct] = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.products WHERE name = ?`, [name]);
        if (existingProduct.length === 0) {
            yield dbConnection_1.DBLocal.promise().query(`INSERT INTO week11Milestone2.products (name, qty, price) VALUES (?, ?, ?)`, [name, qty, price]);
            const [newProduct] = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.products WHERE name = ?`, [name]);
            res.status(200).json((0, errorHandling_1.errorHandling)(newProduct, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product already exist...!!"));
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't create new product...!! Internal Error!"));
    }
});
// Update Product Qty & Price
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const { qty, price } = req.body;
        const [existingProduct] = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.products WHERE name = ?`, [name]);
        if (existingProduct.length === 0) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
            return;
        }
        else {
            yield dbConnection_1.DBLocal.promise().query(`UPDATE week11Milestone2.products SET qty = ?, price = ? WHERE name = ?`, [qty, price, name]);
            res.status(200).json((0, errorHandling_1.errorHandling)(existingProduct, null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Update Product...!! Internal Error!"));
    }
});
//  get all Product Data
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProduct = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.products`);
        if (getAllProduct.length === 0) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
            return;
        }
        else {
            res.status(200).json((0, errorHandling_1.errorHandling)(getAllProduct[0], null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Get All Product Data...!! Internal Error!"));
    }
});
// get product by name
const getOneProductName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const [getOneProduct] = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.products WHERE name = ?`, [name]);
        if (getOneProduct.length === 0) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
            return;
        }
        else {
            res.status(200).json((0, errorHandling_1.errorHandling)(getOneProduct, null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Product Data...!! Internal Error!"));
    }
});
// delete product
const productsController = { createNewProduct, updateProduct, getAllProduct, getOneProductName };
exports.default = productsController;
