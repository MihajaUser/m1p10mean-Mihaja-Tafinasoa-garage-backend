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

export const findCustomerById = async (_id) => {
  const user = await CustomerModel.findOne({ _id });
  return user;
};
export const replaceCustomerRepairs = async (customer, depot) => {
  customer.repairs.push(depot.repairs);
  await customer.save();
};
export const carrepairs = async (id) => {
  const user = CustomerModel.find({ _id: id }).select({ repairs: 1, _id: 1 });
  return user;
};

export const findCustomerById = async (_id) => {
  const user = await CustomerModel.findOne({ _id });
  return user;
};
export const replaceCustomerRepairs = async (customer, depot) => {
  customer.repairs.push(depot.repairs);
  await customer.save();
};
export const carrepairs = async (id) => {
  const user = CustomerModel.find({ _id: id }).select({ repairs: 1, _id: 1 });
  return user;
};
