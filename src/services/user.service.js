import { genSalt, hash } from "bcryptjs";
import { insertUserMdl } from "../models/user.model";

export const insertUserSvs = async (user) => {
  const salt = await genSalt(10);
  const hashed = await hash(user.password, salt);
  user.password = hashed;
  user = insertUserMdl(user);
};
