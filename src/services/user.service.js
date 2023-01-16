import pkg from "bcryptjs";
import {
  findCandidateByUsername,
  insertUserMdl,
} from "../models/user.model.js";
import config from "config";
import jwt from "jsonwebtoken";

const { genSalt, hash, compare } = pkg;

export const insertUserSvc = async (user) => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(user.password, salt);
    user.password = hashed;
    user = insertUserMdl(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUserSvc = async (useOnLog) => {
  const user = await findCandidateByUsername(useOnLog.username);
  /* Username */
  if (!user) {
    throw new Error("Username not found");
  }
  /* Password */
  if (!(await compare(useOnLog.password, user.password))) {
    throw new Error("Incorrect password");
  }
  /* Role  */
  let access = false;
  user.roles.forEach((userRole) => {
    if (userRole === useOnLog.logAs) access = true;
  });

  if (!access) {
    throw new Error("Access denied");
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
