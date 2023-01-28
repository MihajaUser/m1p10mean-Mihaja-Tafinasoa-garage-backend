import { CustomerModel } from "../schemas/customer.schema.js";

/*
 * repairs
 */
export const insertRepairMdl = async (customer, depot) => {
  try {
    console.log(customer);
    customer.repairs.push(depot.repairs);
    return await customer.save();
  } catch (error) {
    console.log(error);
  }
};
export const getRepairByCustomerMdl = async (id) => {
  return await CustomerModel.find({ _id: id }).select({
    repairs: 1,
    _id: 1
  });
};

export const getUnconfirmedRepairMdl = async () => {
  try {
    console.log("bonjour");

    return await CustomerModel.find({ "repairs.is_confirmed": false }).select(
      "_id firstname lastname repairs._id repairs.created_at repairs.car.registration_number repairs.car.brand repairs.car.model "
    );
  } catch (error) { }
};

/*
 *to do
 */

export const confirmRepairMdl = async (data) => {
  try {
    // console.log(data.toDo);
    const customer = await CustomerModel.findById(data.customerId);
    // if (!customer) throw new Error("Customer not found");
    const repair = customer.repairs.find((item) => item.id === data.repairId);
    repair.is_confirmed = true;
    const newArray = Array.prototype.concat(repair.to_do, data.toDo);
    repair.to_do = newArray;
    console.log(newArray);
    await customer.save();
  } catch (error) {
    console.log(error);
  }
};

export const getAvancementRepairsMdl = async (data) => {
  return await CustomerModel.find({ "repairs.to_do.status": true })
  // return { message: 'dans le model' }
}
