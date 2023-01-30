import config from "config";
import { UserModel } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../schemas/customer.schema.js";

export const checkJwt = (req, res, next) => {
  // Get the jwt token from the head
  const token = req.headers.auth;
  let jwtPayload;
  // Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.get("jwt.secret"));
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    console.log(error);
    res.status(401).send("unauthorized");
    return;
  }
  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.get("jwt.secret"), {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);
  // Call the next middleware or controller
  next();
};

export const checkRole = (roles, userType) => {
  return async (req, res, next) => {
    console.log(req.originalUrl + " " + userType);
    const id = res.locals.jwtPayload.userId;
    let user;
    try {
      user =
        userType === 1
          ? await UserModel.findById(id)
          : await CustomerModel.findById(id);
    } catch (error) {
      return res.status(401).send("user not found");
    }
    let access = false;
    try {
      roles.forEach((requiredRole) => {
        const userRoles = userType === 1 ? user.roles : user.credentials.roles;
        userRoles.forEach((userRole) => {
          if (requiredRole === userRole) {
            access = true;
          }
        });
      });
      if (!access) return res.status(401).send("invalid roles");
      else return next();
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  };
};
