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

