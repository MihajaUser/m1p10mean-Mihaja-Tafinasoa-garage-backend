import { CustomerModel } from "../schemas/customer.schema.js";
export const insertTodoMdl = async (todo) => {
  try {
    const user = await CustomerModel.find({ _id: todo._id, "customers.repairs._id": { "$in": [todo.idRepair] } });
    return { message: "insert todo successfully", user }
  } catch (error) {
    console.log(error);
  }
};
