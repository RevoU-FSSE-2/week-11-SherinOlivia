import express from 'express'
const userrouter = express.Router()
import usersController from '../controller/usersController';
import authenMiddleware from '../middleware/authenticationMiddleware'
import authorMiddleware from '../middleware/authorizationMiddleware'

// Register Account (Reminder: default is cust, admin can register staff)
userrouter.post('/register', usersController.registerUser);

// Login Account
userrouter.post('/login', usersController.loginUser);

// Get All User data (Cust, Staff, Admin) ===> Admin Only!
userrouter.get('/', authenMiddleware, authorMiddleware(['admin']), usersController.getAllUser);

// Get All Cust Data (Cust) ===> Staff & Admin Only!
// userrouter.get('/cust', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getAllCust);

// Get All Staff Data (Staff) ===> Staff & Admin Only!
// userrouter.get('/staff', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getAllStaff);

// Get One Cust Data (Cust) ===> Staff & Admin Only!
// userrouter.get('/cust/:id', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getOneCust);

// Get One Staff Data (Staff) ===> Staff & Admin Only!
// userrouter.get('/staff/:id', authenMiddleware, authorMiddleware(['staff','admin']), usersController.getOneStaff);

// Patch/Update name & address
userrouter.patch('/update/:username', authenMiddleware, authorMiddleware(['cust','staff','admin']), usersController.updateUser);

export default userrouter