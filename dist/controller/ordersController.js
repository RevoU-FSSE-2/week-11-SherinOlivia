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
// create new order
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cust_name, product_name, order_qty } = req.body;
        const [newOrder] = yield dbConnection_1.DBLocal.promise().query(`INSERT INTO week11Milestone2.orders (cust_name, product_name, order_qty, total, status, order_datetime, isDeleted)
        VALUES (?, ?, ?, (SELECT price FROM week11Milestone2.products WHERE name = ?) * ?, ?, ?, ?)`, [cust_name, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']);
        const [createdOrder] = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.orders WHERE id = ?`, [newOrder.insertId]);
        res.status(200).json((0, errorHandling_1.errorHandling)(createdOrder, null));
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Order Request Failed..!! Internal Error!"));
    }
});
// update order status (from pending to completed or cancelled)
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    try {
        const checkId = yield dbConnection_1.DBLocal.promise().query(`SELECT * FROM week11Milestone2.orders WHERE id = ?`, [id]);
        if (checkId) {
            yield dbConnection_1.DBLocal.promise().query(`UPDATE week11Milestone2.orders SET status = ? WHERE id = ?`, [status, id]);
            res.status(200).json((0, errorHandling_1.errorHandling)(checkId, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Order doesn't exist...!!"));
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)(null, "Order Status Update Failed..!! Internal Error!"));
    }
});
// delete order (soft delete === isDeleted)
