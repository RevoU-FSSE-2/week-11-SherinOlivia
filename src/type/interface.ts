import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RoleReq extends Request {
  role: string,
  user: {
    id: number,
    username: string,
    password: string,
    name: string,
    address: string,
    role: string
  };
}

export interface RoleJWT extends JwtPayload {
    role: string;
}