import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user/user.model";
import { User } from "../schema/user/user.schema";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    let user: any;
    try {
      user = await UserModel.findById(id);
    } catch (id) {
      return res.status(401).send("user not found");
    }
    //Check if array of authorized roles includes the user's role
    let access = false;
    roles.forEach((required_role) => {
      user.roles.forEach((user_role: string) => {
        if (required_role === user_role) {
          access = true;
          next();
        }
      });
    });

    if (access) return;
    else return res.status(401).send("invalid token");
  };
};
