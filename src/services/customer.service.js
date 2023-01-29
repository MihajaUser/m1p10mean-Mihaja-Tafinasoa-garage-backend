import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

import { confirmRegistrationMailSvc } from "./mail.service.js";
import {
  insertCustomerMdl,
  findCustomerByEmailMdl,
  paymentMdl
} from "../models/customer.model.js";

const { genSalt, hash, compare } = bcrypt;
export const insertCustomerSvc = async (customer) => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(customer.credentials.password, salt);
    customer.credentials.password = hashed;
    customer.repairs = [];
    await insertCustomerMdl(customer);
    confirmRegistrationMailSvc(customer);
  } catch (error) {
    console.log(error);
  }
};

export const loginCustomerSvc = async (useOnLog) => {
  const user = await findCustomerByEmailMdl(useOnLog.email);
  /* Username */
  if (!user) {
    const error = new Error("Username not found");
    error.status = 401;
    throw error;
  }
  /* Password */
  console.log(useOnLog.password, " ", user.credentials.password);
  if (!(await compare(useOnLog.password, user.credentials.password))) {
    const error = new Error("Invalid Password");
    error.status = 401;
    throw error;
  }
  /* Role  */
  let access = false;
  user.credentials.roles.forEach((userRole) => {
    console.log(userRole + " " + useOnLog.logAs);
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
    loggedAs: useOnLog.logAs
  };
};
export const paymentSvc = async (data) => {
  try {
    return await paymentMdl(data);
  } catch (error) {
    console.log(error);
  }
}