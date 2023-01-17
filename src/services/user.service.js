import pkg from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import {
  findCandidateByUsername,
  insertUserMdl,
} from "../models/user.model.js";
import { confirmRegistrationMailSvc } from "./mail.service.js";

const { genSalt, hash, compare } = pkg;

export const insertUserSvc = async (user) => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(user.password, salt);
    user.password = hashed;
    await insertUserMdl(user);
    console.log("__________", user);
    confirmRegistrationMailSvc(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUserSvc = async (useOnLog) => {
  const user = await findCandidateByUsername(useOnLog.username);
  /* Username */
  if (!user) {
    const error = new Error("Username not found");
    error.status = 401;
    throw error;
  }
  /* Password */
  if (!compare(useOnLog.password, user.password)) {
    const error = new Error("Invalid Password");
    error.status = 401;
    throw error;
  }
  /* Role  */
  let access = false;
  user.roles.forEach((userRole) => {
    if (userRole === useOnLog.logAs) access = true;
  });

  if (!access) {
    const error = new Error("Invalid Role");
    error.status = 401;
    throw error;
  }
  /*  */
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.get("jwt.secret"),
    { expiresIn: "1h" }
  );
  return {
    token,
    user,
    loggedAs: useOnLog.logAs,
  };
};
