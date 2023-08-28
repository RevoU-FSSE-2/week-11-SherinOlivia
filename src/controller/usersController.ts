import { Request, Response } from 'express';
import { DBLocal } from '../config/dbConnection';
import { errorHandling, query } from './errorHandling';
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import JWT_TOKEN from '../config/jwtConfig'
import { RoleReq } from '../type/interface';

// Register Account (Reminder: default is cust, admin can register staff)
const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } =  req.body;
        const hashedPass = await bcrypt.hash(password, 10)
        const dbUser: any[] = await DBLocal.promise().query(`INSERT INTO week11Milestone2.users (username, password, role) VALUE (${username}, ${hashedPass})`);
        
        const existedUser = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE username = ${username}`);
        if (existedUser) {
            res.status(400).json(errorHandling(null, "Username already exist...!!"));
        } else {
            res.status(200).json(errorHandling({ id: dbUser[0].insertId as { id: number }, dbUser}, null));
        }

    } catch (error) {
        res.status(500).json(errorHandling(null, "Register User Failed..!! Internal Error!"));
    }
}

// Login Account
const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const existedUser: any = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE username = ${username}`);
        const passwordCheck = await bcrypt.compare(password, existedUser[0].password)

        if (passwordCheck) {
            const token = jwt.sign({ username: existedUser[0].username, id: existedUser[0].id, role: existedUser[0].role }, JWT_TOKEN as Secret)
            res.status(200).json(errorHandling({
              message: `${existedUser[0].username} Successfully logged in as ${existedUser[0].role}`,
              data: token}, null))
        } else {
            res.status(400).json(errorHandling(null, "Wrong Username or Password...!! Please Try Again..!!"));
        }
    } catch (error) {
        res.status(500).json(errorHandling(null, "Login Failed..!! Internal Error!"));
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

const updateUser: any = async (req: RoleReq, res: Response) => {
    try {
        const { role, username } = req.user;

        const checkUsername = req.params.username
        const { name, address } = req.body
        if ((role !== "staff" && role !== "admin") && username === checkUsername) {
            const updateData = await DBLocal.promise().query(`
            UPDATE week11Milestone2.users
            SET name = ${name}, address = ${address}
            WHERE username = ${username}`)

            res.status(200).json(errorHandling({
                message: "User Data Updated Successfully",
                data: updateData}, null));
        } else if (role == "staff" || role == "admin") {
            const updateData = await DBLocal.promise().query(`
            UPDATE week11Milestone2.users
            SET name = ${name}, address = ${address}
            WHERE username = ${username}`)

            res.status(200).json(errorHandling({
                message: "User Data Updated Successfully",
                data: updateData}, null));
        }

    } catch (error) {
        res.status(500).json(errorHandling(null, "User Data Update Failed...!!"));
    }
}




const usersController = { registerUser, loginUser, getAllUser, updateUser }

export default usersController