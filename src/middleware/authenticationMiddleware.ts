import { Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import JWT_TOKEN from "../config/jwtConfig";
import { RoleReq, RoleJWT } from "../type/interface";

const authenMiddleware: any = (req: RoleReq, res: Response, next: NextFunction) => {
    const authen = req.headers.authorization



    if (!authen) {
        res.status(400).json({error : "Unauthorized Access!!"})
    } else {
        const secretToken = authen.split(' ')[1]

        try {
            const decodedToken = jwt.verify(secretToken, JWT_TOKEN as Secret) as RoleJWT 
            console.log(decodedToken, `==== User's Decoded Data`)
            req.role = decodedToken.role
            next()
        }catch (error) {
            res.status(400).json({error: error})
        }
    } 
}

export default authenMiddleware