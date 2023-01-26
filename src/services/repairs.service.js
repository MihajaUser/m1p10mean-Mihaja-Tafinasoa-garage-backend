import { findCustomerByIdMdl } from "../models/customer.model.js";
import {
  getRepairByCustomerMdl,
  getUnconfirmedRepairMdl,
  insertRepairMdl
} from "../models/repair.model.js";

/*
 *depot car
 */
export const insertRepairSvc = async (depot) => {
  const user = await findCustomerByIdMdl(depot._id);
  return await insertRepairMdl(user, depot);
};

export const getRepairsByCustomerSvc = async (id) => {
  try {
    const repairs = await getRepairByCustomerMdl(id);
    return repairs;
  } catch (error) {
    console.log(error);
  }
};

export const getUnconfirmedRepairSvc = async () => {
  return await getUnconfirmedRepairMdl();
};

//
export const confirmRepairSvc = async (data) => {
  try {
    return await insertRepairMdl(data);
  } catch (error) {
    console.log(error);
  }
};
