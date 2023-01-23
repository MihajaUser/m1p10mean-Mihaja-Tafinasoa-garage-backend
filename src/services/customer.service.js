import bcrypt from "bcryptjs";
// import config from "config";
// import jwt from "jsonwebtoken";

import { confirmRegistrationMailSvc } from "./mail.service.js";
import { insertCustomerMdl } from "../models/customer.model.js";

const { genSalt, hash, compare } = bcrypt;

export const insertCustomerSvc = async (customer) => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(customer.credentials.password, salt);
    customer.credentials.password = hashed;
    // await insertCustomerMdl(customer);
    confirmRegistrationMailSvc(customer);
  } catch (error) {
    console.log(error);
  }
};
