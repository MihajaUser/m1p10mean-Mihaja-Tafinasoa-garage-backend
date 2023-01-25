import { CustomerModel } from "../schemas/customer.schema.js";
export const insertTodoMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    // if (!customer) throw new Error("Customer not found");
    customer.repairs
      .find((item) => item.id === data.repairId)
      .to_do.push(data.toDo);
    await customer.save();
  } catch (error) {
    console.log(error);
  }
};
