import { Request, Response } from 'express';
import { DBLocal } from '../config/dbConnection';
import { errorHandling } from './errorHandling';
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import JWT_TOKEN from '../config/jwtConfig'
import { RowDataPacket } from 'mysql2';

// create new order
const createNewOrder = async (req: Request, res: Response) => {
    try {
        const { cust_name, product_name, order_qty } =  req.body;
        const [newOrder] = await DBLocal.promise().query(`INSERT INTO week11Milestone2.orders (cust_name, product_name, order_qty, total, status, order_datetime, isDeleted)
        VALUES (?, ?, ?, (SELECT price FROM week11Milestone2.products WHERE name = ?) * ?, ?, ?, ?)`,
        [cust_name, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']) as RowDataPacket[];
        
       const [createdOrder] = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.orders WHERE id = ?`,
        [newOrder.insertId]) as RowDataPacket[];
        
        res.status(200).json(errorHandling(createdOrder, null));
        } catch (error) {
        console.error(error)
        res.status(500).json(errorHandling(null, "Order Request Failed..!! Internal Error!"));
    }
}

// update order status (from pending to completed or cancelled)
const updateOrder = async (req: Request, res: Response) => {
    const id = req.params.id
    const {status} = req.body

    try {
        const checkId = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.orders WHERE id = ?`,
        [id]) as RowDataPacket[]

        if (checkId) {
            await DBLocal.promise().query(`UPDATE week11Milestone2.orders SET status = ? WHERE id = ?`,
            [status, id])

            res.status(200).json(errorHandling(checkId, null));
        } else {
            res.status(400).json(errorHandling(null, "Order doesn't exist...!!"));
            return
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(errorHandling(null, "Order Status Update Failed..!! Internal Error!"));
    }
}

// delete order (soft delete === isDeleted)