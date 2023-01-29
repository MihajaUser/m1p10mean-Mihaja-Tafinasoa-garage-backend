import { findCustomerByIdMdl } from "../models/customer.model.js";
import {
  confirmRepairMdl,
  getRepairByCustomerMdl,
  getUnconfirmedRepairMdl,
  insertRepairMdl,
  getRepairByCustomerAndRepairMdl,
  getAllRepairMdl,
  insertTodoMdl
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

export const getRepairByCustomerAndRepairSvc = async (customerId, repairId) => {
  try {
    return await getRepairByCustomerAndRepairMdl(customerId, repairId);
  } catch (error) { }
};

export const getAllRepairSvc = async (query) => {
  return await getAllRepairMdl(query);
};
export const insertTodoSvc = async (query) => {
  return await insertTodoMdl(query);
}
