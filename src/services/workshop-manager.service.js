import { insertTodoMdl } from "../models/workshop-manager.model.js";
export const insertTodoSvc = async (data) => {
  try {
    return await insertTodoMdl(data);
  } catch (error) {
    console.log(error);
  }
};
