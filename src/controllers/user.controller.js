import { insertUserSvc, loginUserSvc } from "../services/user.service.js";

export const insertUserCtrl = async (req, res, next) => {
  try {
    await insertUserSvc(req.body);
    return res.status(200).json({ message: "User inserted successfully" });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const loginUserCtrl = async (req, res, next) => {
  try {
    const data = await loginUserSvc(req.body);
    return res
      .status(200)
      .json({ message: "User logged in successfully", data });
  } catch (error) {
    console.log(error.status);
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const tokenTest = async (req, res, next) => {
  return res.status(200).json({ message: "access allowed" });
};
