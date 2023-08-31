import express from 'express'
const orderrouter = express.Router()
import { createNewOrder, updateOrder, getAllOrders, getAllCustOrders, deleteOrder, getOrderHistory } from '../controller/ordersController';
import authorMiddleware from '../middleware/authorizationMiddleware'

// Create new Order
orderrouter.post('/new', createNewOrder);

// Update Order status by id (Completed / Cancelled) ===> Staff & Admin Only!
orderrouter.patch('/update/:id', authorMiddleware(['staff','admin']), updateOrder);

// soft delete order
orderrouter.delete('/delete/:id', deleteOrder);

// Get All Order History ===> Admin Only!
orderrouter.get('/history', authorMiddleware(['admin']), getOrderHistory);

// Get All Order Data by cust id ===> Staff & Admin Only!
orderrouter.get('/:id', authorMiddleware(['staff','admin']), getAllCustOrders);

// Get Orders Data (users can only see their own)
orderrouter.get('/', getAllOrders);

export default orderrouter