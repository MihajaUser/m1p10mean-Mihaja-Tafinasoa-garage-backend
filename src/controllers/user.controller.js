import { insertUserSvc } from "../services/user.service";

export const insertUserHandler = (req, res, next) => {
  insertUserSvc(req.body);
};
