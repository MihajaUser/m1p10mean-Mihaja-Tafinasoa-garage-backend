import { findCustomerByIdMdl } from "../models/customer.model.js";
import {
  confirmRepairMdl,
  getRepairByCustomerMdl,
  getUnconfirmedRepairMdl,
  insertRepairMdl,
  getAvancementRepairsMdl
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
    return await confirmRepairMdl(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAvancementRepairsSvc = async (data) => {
  try {
    console.log("service");
    return await getAvancementRepairsMdl(data);
  } catch (error) {
    console.log(error);
  }
};
