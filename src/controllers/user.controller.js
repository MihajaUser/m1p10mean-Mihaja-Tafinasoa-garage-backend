import { insertUserSvc } from "../services/user.service.js";

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
