import { Request, Response } from 'express';
import { DBLocal } from '../config/dbConnection';
import { errorHandling } from './errorHandling';
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import JWT_TOKEN from '../config/jwtConfig'
import { RowDataPacket } from 'mysql2';

// Register Account (Reminder: default is cust, admin can register staff)
const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } =  req.body;
        const hashedPass = await bcrypt.hash(password, 10)
        const [existingUser] = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE username = ?`, [username]) as RowDataPacket[];
        
        if (existingUser.length === 0) {
            const newUser = await DBLocal.promise().query(
            `INSERT INTO week11Milestone2.users (username, password, role) VALUES (?, ?, ?)`,
            [username, hashedPass, 'cust']);
            res.status(200).json(errorHandling(newUser, null));
        } else {
            res.status(400).json(errorHandling(null, "Username already exist...!!"));
            return
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(errorHandling(null, "Register User Failed..!! Internal Error!"));
    }
}

// Login Account

const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const existingUser = await DBLocal.promise().query("SELECT * FROM week11Milestone2.users WHERE username = ?", [username]) as RowDataPacket[];
        const user = existingUser[0][0]
        console.log(user, "password:", user.password)
        
        const passwordCheck = await bcrypt.compare(password, user.password) 

        if (passwordCheck) {
            const token = jwt.sign({ username: user.username, id: user.id, role: user.role }, JWT_TOKEN as Secret)
            res.status(200).json(errorHandling({
                message: `${user.username} Successfully logged in as ${user.role}`,
                data: token}, null))
          } else {
            res.status(400).json(errorHandling('Password is incorrect', null))
          }
    } catch (error) {
        console.error(error)
        res.status(500).json(errorHandling('Cannot Connect!! Internal Error!', null));
    }
}

// Get All User data (Cust, Staff, Admin) ===> Admin Only!
const getAllUser = async (req: Request, res: Response) => {
    try {
        const allUser = await DBLocal.promise().query('SELECT * FROM week11Milestone2.users')

        if (!allUser) {
            res.status(400).json(errorHandling(null, "User Data Unavailable..."));
        } else {
            res.status(200).json(errorHandling(allUser, null));
        }
    } catch (error) {
        res.status(500).json(errorHandling(null, "User Data Retrieval Failed...!!"));
    }
}

// Patch/Update name & address

const updateUser = async (req: Request, res: Response) => {
    try {
        const { role, username } = (req as any).user;

        const checkUsername = req.params.username
        const { name, address } = req.body
        if ((role !== "staff" && role !== "admin") && username === checkUsername) {
            const updateData = await DBLocal.promise().query(`
                UPDATE week11Milestone2.users
                SET name = ?, address = ?
                WHERE username = ?`,
                [name, address, username]);

            res.status(200).json(errorHandling({
                message: "User Data Updated Successfully",
                data: updateData}, null));
        } else if (role == "staff" || role == "admin") {
            const updateData = await DBLocal.promise().query(`
                UPDATE week11Milestone2.users
                SET name = ?, address = ?
                WHERE username = ?`,
                [name, address, username])

            res.status(200).json(errorHandling({
                message: "User Data Updated Successfully",
                data: updateData}, null));
        }

    } catch (error) {
        console.error(error)
        res.status(500).json(errorHandling(null, "User Data Update Failed...!!"));
    }
}


const usersController = { registerUser, loginUser, getAllUser, updateUser }

export default usersController