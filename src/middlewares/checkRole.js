import UserModel from "../models/user/user.model";

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
    if (access) return;
    else return res.status(401).send("invalid token");
  };
};
