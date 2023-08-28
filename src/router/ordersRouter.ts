import express from 'express'
const orderrouter = express.Router()
// import ordersController from '../controller/ordersController';
import authorMiddleware from '../middleware/authorizationMiddleware'

// Get Orders Data (users can only see their own)
// orderrouter.get('/', ordersController.getAllOrders);

// Get All Order Data by cust name ===> Staff & Admin Only!
// orderrouter.get('/user', authorMiddleware({ roles: ['staff', 'admin'] }), ordersController.getAllCustOrders);

// Get One Order Data by id
// orderrouter.get('/:id', authorMiddleware({ roles: ['staff', 'admin'] }), ordersController.getOneOrder);

// Create new Order
// orderrouter.post('/new', ordersController.createNewOrder);

// Update Order status (Completed / Cancelled) ===> Staff & Admin Only!
// orderrouter.patch('/update', authorMiddleware({ roles: ['staff', 'admin'] }), ordersController.updateOrder);

// Get All Completed Order 
// orderrouter.get('/completed', ordersController.getCompletedOrder);

// Get All Completed Order  ===> Staff & Admin Only!
// orderrouter.get('/cancelled', authorMiddleware({ roles: ['staff', 'admin'] }), ordersController.getCancelledOrder);

// Get All Order History ===> Admin Only!
// orderrouter.get('/history', authorMiddleware({ roles: ['admin'] }), ordersController.getOrderHistory);

// export default orderrouter