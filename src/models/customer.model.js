import { CustomerModel } from "../schemas/customer.schema.js";

export const insertCustomerMdl = async (customer) => {
  CustomerModel.create(customer, function (err, small) {
    if (err) {
      console.log(err);
    }
    console.log("customer registered");
  });
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
