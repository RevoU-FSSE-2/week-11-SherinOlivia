import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DBLocal } from './dbConnection';
import 'dotenv/config'
import { errorHandling } from '../controller/errorHandling';

const insertAdmin = async (req: Request, res: Response) => {
    try {
        const adminCheck = await DBLocal.query(`SELECT * FROM users WHERE role = 'admin'`);

        if (!adminCheck) {
            const adminPass = process.env.ADMIN_PASS;
            const adminUsername = process.env.ADMIN_USERNAME;
            const hashedPass = await bcrypt.hash(adminPass!, 10);
        
        await DBLocal.query(`INSERT INTO users (username, password, role) VALUES (${adminUsername}, ${hashedPass}, 'admin')`)
        res.status(200).json(errorHandling("Admin Account successfully created! Welcome!",null));    
    } else {
            res.status(400).json(errorHandling(null, "Errorr!! Admin already exists"));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(errorHandling(null, "Errorr!! Can't input Admin data"));
    }
}

export default insertAdmin;

