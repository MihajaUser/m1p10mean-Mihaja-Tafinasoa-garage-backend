import { CustomerModel } from "../schemas/customer.schema.js";

export const insertCustomerMdl = async (customer) => {
  try {
    CustomerModel.create(customer, function (err, small) {
      if (err) {
        console.log(err);
      }
      console.log("customer registered");
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const findCustomerByEmailMdl = async (email) => {
  const user = await CustomerModel.findOne({ email });
  return user;
};

/*
 *
 */
export const findCustomerByIdMdl = async (_id) => {
  const user = await CustomerModel.findOne({ _id });
  return user;
};
export const paymentMdl = async (data) => {
  try {
    return await CustomerModel.aggregate([
      { $unwind: "$repairs" },
      { $match: { "repairs.is_confirmed": false } },
      {
        $project: {
          _id: "$_id",
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
  } catch (error) { }
};