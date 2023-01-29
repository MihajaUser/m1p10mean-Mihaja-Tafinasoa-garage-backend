import { CustomerModel } from '../schemas/customer.schema.js';

export const insertCustomerMdl = async customer => {
  try {
    CustomerModel.create(customer, function (err, small) {
      if (err) {
        console.log(err);
      }
      console.log('customer registered');
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const findCustomerByEmailMdl = async email => {
  const user = await CustomerModel.findOne({ email });
  return user;
};

/*
 *
 */
export const findCustomerByIdMdl = async _id => {
  const user = await CustomerModel.findOne({ _id });
  return user;
};
export const paymentMdl = async data => {
  try {
    console.log('----------------------------------');
    //   console.log(data);
    const customer = await CustomerModel.findById(data.customerId);
    if (!customer) throw new Error('Customer not found');
    const repairIndex = customer.repairs.findIndex(item => item.id === data.repairId);
    customer.repairs[repairIndex].payment.push(data.payment);
    customer.repairs[repairIndex].total_paid = customer.repairs[repairIndex].payment.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
    console.log(customer.repairs[0]);
    return await customer.save();
  } catch (error) {
    console.log(error);
  }
};
