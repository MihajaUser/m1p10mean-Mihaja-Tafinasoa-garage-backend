import {
  insertTodoMdl,
} from "../models/responsibleWorkshop.model.js";
export const insertTodoSvc = async (todo) => {
  try {
    return await insertTodoMdl(todo)
  } catch (error) {
    console.log(error);
  }
};
