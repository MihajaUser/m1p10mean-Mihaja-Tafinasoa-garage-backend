import { CustomerModel } from "../schemas/customer.schema.js";

export const insertCustomerMdl = async (customer) => {
  CustomerModel.create(customer, function (err, small) {
    if (err) {
      console.log(err);
    }
    console.log("customer registered");
  });
};

// export const findCandidateByUsername = async (username) => {
//   const user = await CustomerModel.findOne({ username });
//   return user;
// };
