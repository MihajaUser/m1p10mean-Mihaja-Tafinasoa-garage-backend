import { CustomerModel } from "../schemas/customer.schema.js";
export const insertTodoMdl = async (todo) => {
  try {
    const user = await CustomerModel.find({ _id: todo._id, "customers.repairs._id": { "$in": [todo.idRepair] } });
    return { message: "insert todo successfully", user }
  } catch (error) {
    console.log(error);
  }
};

// export const findCustomerByIdMdl = async (_id) => {
//   const user = await CustomerModel.findOne({ _id });
//   return user;
// };
// export const pushCarDepotMdl = async (customer, depot) => {
//   customer.repairs.push(depot.repairs);
//   await customer.save();
// };
// export const getCarDepotMdl = async (id) => {
//   const user = CustomerModel.find({ _id: id }).select({ repairs: 1, _id: 1 });
//   return user;
// };
