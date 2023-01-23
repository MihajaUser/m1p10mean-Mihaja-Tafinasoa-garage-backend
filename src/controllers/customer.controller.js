import { insertCustomerSvc } from "../services/customer.service.js";

export const getAllCustomerHandler = (req, res) => {
  return res.status(200).json({ message: "bonjour" });
};

export const signUpCustomerHandler = async (req, res) => {
  try {
    await insertCustomerSvc(req.body);
    return res.status(200).json({ message: "customer inserted successfully" });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
export const signInCustomerHandler = (req, res) => {};
