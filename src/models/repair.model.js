import { CustomerModel } from "../schemas/customer.schema.js";
import { LSHFilterQueryGenerator } from "./../helpers/url.helper.js";
import mongoose from "mongoose";

//* repairs
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
    ]);
  } catch (error) {}
};
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
export const getRepairByCustomerAndRepairMdl = async (customerId, repairId) => {
  try {
    return await CustomerModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(customerId) } },
      {
        $project: {
          firstname: "$firstname",
          lastname: "$lastname",
          repairs: {
            $filter: {
              input: "$repairs",
              as: "item",
              cond: {
                $eq: ["$$item._id", mongoose.Types.ObjectId(repairId)]
              }
            }
          }
        }
      }
    ]);
  } catch (error) {
    console.log(error);
  }
};
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
export const getAllUndoneRepairsMdl = async () => {
  return await CustomerModel.aggregate([
    {
      $project: {
        _id: "$_id",
        firstname: "$firstname",
        lastname: "$lastname",
        repairs: {
          $filter: {
            input: "$repairs",
            as: "item",
            cond: {
              $and: [
                {
                  $eq: ["$$item.is_done", false]
                },
                { $eq: ["$$item.is_retrieved", false] }
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        repairs: {
          $map: {
            input: "$repairs",
            as: "repairs",
            in: {
              $mergeObjects: [
                "$$repairs",
                {
                  undone: {
                    $size: {
                      $filter: {
                        input: "$$repairs.to_do",
                        as: "to_do",
                        cond: {
                          $eq: ["$$to_do.status", false]
                        }
                      }
                    }
                  },
                  done: {
                    $size: {
                      $filter: {
                        input: "$$repairs.to_do",
                        as: "to_do",
                        cond: {
                          $eq: ["$$to_do.status", true]
                        }
                      }
                    }
                  },
                  to_do: {
                    $filter: {
                      input: "$$repairs.to_do",
                      as: "to_do",
                      cond: {
                        $eq: ["$$to_do.status", false]
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  ]);
};
export const getRepairsByCustomerMdl = async (customerId) => {
  try {
    return await CustomerModel.aggregate([{ $match: { _id: customerId } }]);
  } catch (error) {
    console.log(error);
  }
};
// * payment
export const insertPaymentMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error("Customer not found");
    const repairIndex = customer.repairs.findIndex(
      (item) => item.id === data.repairId
    );
    customer.repairs[repairIndex].payment.push(data.payment);
    customer.repairs[repairIndex].total_paid = customer.repairs[
      repairIndex
    ].payment.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
    console.log(customer.repairs[0]);
    return await customer.save();
  } catch (error) {
    console.log(error);
  }
};
export const getUnpaidRepairMdl = async (customerId) => {
  try {
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
export const getAllUnpaidRepairsMdl = async () => {
  try {
    return await CustomerModel.aggregate([
      {
        $project: {
          firstname: "$firstname",
          lastname: "$lastname",
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
// * todo
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
export const getUnDoneTodoMdl = async () => {
  try {
    const data = await CustomerModel.aggregate([
      {
        $project: {
          repairs: {
            $map: {
              input: "$repairs",
              as: "repairs",
              in: {
                $mergeObjects: [
                  "$$repairs",
                  {
                    to_do: {
                      $filter: {
                        input: "$$repairs.to_do",
                        as: "to_do",
                        cond: {
                          $eq: ["$$to_do.status", false]
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const validationToDoMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error("Customer not found");
    const repairIndex = customer.repairs.findIndex(
      (item) => item.id === data.repairId
    );
    const toDoIndex = customer.repairs[repairIndex].to_do.findIndex(
      (item) => item.id === data.toDoId
    );
    customer.repairs[repairIndex].to_do[toDoIndex].status = true;
    await customer.save();
    return { message: "Validation to do succuessfull" };
  } catch (error) {
    console.error(error);
  }
};
// * car
export const getRetrievableCarByCustomerMdl = async (customerId) => {
  try {
    console.log("mihaja");
    console.log(customerId);
    return await CustomerModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(customerId) } },
      {
        $project: {
          repairs: {
            $filter: {
              input: "$repairs",
              as: "item",
              cond: [{ $eq: ["$$item.total_amount", "$$item.total_paid"] }]
            }
          }
        }
      }
    ]);
  } catch (error) {}
};
export const retrieveCarMdl = async (data) => {
  try {
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error("Customer not found");
    const repairIndex = customer.repairs.findIndex(
      (item) => item.id === data.repairId
    );
    customer.repairs[repairIndex].is_retrieved = true;
    await customer.save();
    return { message: "recuperation car" };
  } catch (error) {
    console.log(error);
  }
};
