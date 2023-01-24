import {
  insertTodoSvc,
} from "../services/responsibleWorkshop.service.js";

export const insertToDoCtrl = async (req, res) => {
  try {
    const data = await insertTodoSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.status);
  }

};

// export const signUpCustomerHandler = async (req, res) => {
//   try {
//     await insertCustomerSvc(req.body);
//     return res.status(200).json({ message: "customer inserted successfully" });
//   } catch (error) {
//     return res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };