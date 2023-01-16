import { insertUserMdl } from "../models/user.model.js";
import pkg from "bcryptjs";
const { genSalt, hash } = pkg;

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
