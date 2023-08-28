import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RoleReq extends Request {
  role: string;
}

export interface RoleJWT extends JwtPayload {
    role: string;
  }