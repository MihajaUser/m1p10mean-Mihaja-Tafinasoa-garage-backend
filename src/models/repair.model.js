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
    return await CustomerModel.aggregate([
      { $unwind: "$repairs" },
      { $match: { "repairs.is_confirmed": false } },
      {
        $project: {
          _id: "$lastname",
          firstname: "$firstname",
          lastname: "$lastname",
          "repairs._id": "$repairs._id",
          "repairs.created_at": "$repairs.created_at",
          "repairs.car.registration_number": "$repairs.car.registration_number",
          "repairs.car.brand": "$repairs.car.brand",
          "repairs.car.model": "$repairs.car.model"
        }
      }
    ]);
  } catch (error) {}
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

export const getRepairByCustomerAndRepairMdl = async (customerId, repairId) => {
  try {
    console.log("Model");
    return await CustomerModel.aggregate([
      { $unwind: "$repairs" },
      { $unwind: "$repairs.to_do" },
      { $match: { _id: customerId, "repairs._id": repairId } }
    ]);
  } catch (error) {
    console.log(error);
  }
};

// export const getAvancementRepairsMdl = async (data) => {
//   try {
//     console.log("Model");
//     return await CustomerModel.aggregate([
//       { $unwind: "$repairs" },
//       { $unwind: "$repairs.to_do" },
//       { $match: { "repairs.to_do.status": true } }
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// };
