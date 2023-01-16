import config from "config";

const jwt = require("jsonwebtoken");

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
