import { CustomerModel } from "../schemas/customer.schema.js";
import { LSHFilterQueryGenerator } from "./../helpers/url.helper.js";
import mongoose from "mongoose";
/*
 * repairs
 */
export const insertRepairMdl = async (customer, depot) => {
  try {
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
      // { $match: { "repairs.is_confirmed": false } },
      {
        $project: {
          _id: "$_id",
          firstname: "$firstname",
          lastname: "$lastname",
          repairs: {
            $filter: {
              input: "$repairs",
              as: "item",
              cond: { $eq: ["$$item.is_confirmed", false] }
            }
          }
        }
      }
      // {
      //   $project: {
      //     _id: "$_id",
      //     firstname: "$firstname",
      //     lastname: "$lastname",
      //     "repairs._id": "$repairs._id",
      //     "repairs.created_at": "$repairs.createdAt",
      //     "repairs.car.registration_number": "$repairs.car.registration_number",
      //     "repairs.car.brand": "$repairs.car.brand",
      //     "repairs.car.model": "$repairs.car.model"
      //   }
      // }
      // {
      //   $replaceWith: {
      //     $arrayElemAt: [
      //       {
      //         $filter: {
      //           input: "$repairs",
      //           cond: { $eq: ["$$this.is_confirmed", true] }
      //         }
      //       },
      //       0
      //     ]
      //   }
      // }
      // { $unwind: "$repairs" },
      // { $match: { "repairs.is_confirmed": false } }
      // ,
      // {
      //   $project: {
      //     _id: "$_id",
      //     firstname: "$firstname",
      //     lastname: "$lastname",
      //     "repairs._id": "$repairs._id",
      //     "repairs.created_at": "$repairs.createdAt",
      //     "repairs.car.registration_number": "$repairs.car.registration_number",
      //     "repairs.car.brand": "$repairs.car.brand",
      //     "repairs.car.model": "$repairs.car.model"
      //   }
      // }
    ]);
  } catch (error) { }
};

/*
 *to do
 */

export const confirmRepairMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error("Customer not found");

    const repair = customer.repairs.find((item) => item.id === data.repairId);
    repair.is_confirmed = true;
    const tempArray = Array.prototype.concat(repair.to_do, data.toDo);
    //
    repair.total_amount = tempArray.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    repair.total_paid = 0;
    repair.to_do = tempArray;
    repair.payment = [];
    //
    return await customer.save();
  } catch (error) {
    console.log(error);
  }
};
export const insertTodoMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error("Customer not found");
    const repair = customer.repairs.find((item) => item.id === data.repairId);
    const tempArray = Array.prototype.concat(repair.to_do, data.toDo);
    const repairIndex = customer.repairs.findIndex(
      (item) => item.id === data.repairId
    );
    customer.repairs[repairIndex].to_do = tempArray;
    console.log(customer.repairs[repairIndex]);
    customer.repairs[repairIndex].total_amount = customer.repairs[
      repairIndex
    ].to_do.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    await customer.save();
    return { message: "insert todo successfully" };
  } catch (error) {
    console.log(error);
  }
};
export const getRepairByCustomerAndRepairMdl = async (customerId, repairId) => {
  try {
    return await CustomerModel.aggregate([{ $match: { _id: customerId } }]);
  } catch (error) {
    console.log(error);
  }
};

export const getUnpaidRepairMdl = async (customerId) => {
  try {
    console.log(customerId);

    return await CustomerModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(customerId) } },
      {
        $project: {
          repairs: {
            $filter: {
              input: "$repairs",
              as: "item",
              cond: { $gt: ["$$item.total_amount", "$$item.total_paid"] }
            }
          }
        }
      }
    ]);
  } catch (error) {
    console.log(error);
  }
};
//
export const getAllRepairMdl = async (query) => {
  const _generatedQuery = LSHFilterQueryGenerator(query);
  console.log(_generatedQuery);
  const page = query.page ? query.page : 1;
  const step = query.step ? query.step : 5;
  return {
    total: await CustomerModel.countDocuments({
      ..._generatedQuery
    }),
    candidates: await CustomerModel.find({
      ..._generatedQuery
    })
      .limit(step * 1)
      .skip((Number(page) - 1) * step)
      .exec()
  };
};
