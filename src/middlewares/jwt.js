import config from "config";
import { UserModel } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";

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
    // eslint-disable-next-line comma-dangle
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);
  // Call the next middleware or controller
  next();
};

export const checkRole = (roles) => {
  return async (req, res, next) => {
    // Get the user ID from previous middleware
    const id = res.locals.jwtPayload.userId;
    let user;
    try {
      user = await UserModel.findById(id);
    } catch (id) {
      return res.status(401).send("user not found");
    }
    // Check if array of authorized roles includes the user's role
    let access = false;
    roles.forEach((requiredRole) => {
      user.roles.forEach((userRole) => {
        if (requiredRole === userRole) {
          access = true;
          next();
        }
      });
    });
    console.log(roles, user.roles);
    if (access) return;
    else return res.status(401).send("invalid token");
  };
};
