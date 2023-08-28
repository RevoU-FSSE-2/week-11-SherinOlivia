import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DBLocal } from './dbConnection';
import 'dotenv/config'

const insertAdmin = async (req?: Request, res?: Response) => {
    try {
        const [adminCheck] = await DBLocal.promise().query(`SELECT * FROM week11Milestone2.users WHERE role = 'admin'`);
        
        if (Object.keys(adminCheck).length === 0) {
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminPass = process.env.ADMIN_PASS;
            const hashedPass = await bcrypt.hash(adminPass!, 10);
            
        await DBLocal.promise().query(`INSERT INTO week11Milestone2.users (username, password, role) VALUES ('${adminUsername}', '${hashedPass}', 'admin')`)
        console.log("Admin Account successfully created! Welcome!");    
    } else {
        console.error("Errorr!! Admin already exists");
        }
    } catch (error) {
        console.error("Errorr!! Can't input Admin data");
    }
}


export default insertAdmin;

