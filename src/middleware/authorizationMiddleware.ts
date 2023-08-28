import { Request, Response, NextFunction } from "express";
import { RoleReq } from "../type/interface";


const authorMiddleware: any = (roles: string[]) => (req: RoleReq, res: Response, next: NextFunction) => {

    if (!roles.includes(req.role)) {
        return res.status(401).json({ message: "Unauthorized Access!" })
      }
      next()
}

export default authorMiddleware