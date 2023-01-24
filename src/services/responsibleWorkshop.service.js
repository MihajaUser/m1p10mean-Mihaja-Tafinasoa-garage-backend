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

// export const getCarDepotSvc = async (id) => {
//   try {
//     const repairs = await getCarDepotMdl(id);
//     return repairs;
//   } catch (error) {
//     console.log(error);
//   }
// };