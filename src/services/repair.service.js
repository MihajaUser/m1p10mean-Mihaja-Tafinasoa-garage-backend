import { findCustomerByIdMdl } from "../models/customer.model.js";
import {
  confirmRepairMdl,
  getRepairByCustomerMdl,
  getUnconfirmedRepairMdl,
  insertRepairMdl,
  getRepairByCustomerAndRepairMdl,
  getAllRepairMdl,
  getUnpaidRepairMdl,
  insertTodoMdl,
  insertPaymentMdl,
  getRetrievableCarByCustomerMdl,
  getUnDoneTodoMdl,
  validationToDoMdl,
  retrieveCarMdl,
  getAllUndoneRepairsMdl,
  getAllUnpaidRepairsMdl,
  getRepairsByCustomerMdl
} from "../models/repair.model.js";

// * repair
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
export const getUnpaidRepairSvc = async (customerId) => {
  try {
    return await getUnpaidRepairMdl(customerId);
  } catch (error) { }
};
export const getAllRepairSvc = async (query) => {
  return await getAllRepairMdl(query);
};
export const getAllUndoneRepairsSvc = async () => {
  try {
    console.log("svc");
    return await getAllUndoneRepairsMdl();
  } catch (error) {
    console.log(error);
  }
};
export const getRepairsByCustomer = async (customerId) => {
  try {
    return await getRepairsByCustomerMdl(customerId);
  } catch (error) { }
};
// * to do
export const insertTodoSvc = async (query) => {
  return await insertTodoMdl(query);
};
export const getUnDoneTodoSvc = async () => {
  try {
    return await getUnDoneTodoMdl();
  } catch (error) {
    console.log(error);
  }
};
export const validationToDoSvc = async (data) => {
  try {
    return await validationToDoMdl(data);
  } catch (error) {
    console.log(error);
  }
};
// * payment
export const insertPaymentSvc = async (data) => {
  try {
    return await insertPaymentMdl(data);
  } catch (error) {
    console.log(error);
  }
};
export const getAllUnpaidRepairSvc = async () => {
  try {
    return await getAllUnpaidRepairsMdl();
  } catch (error) { }
};
// * car
export const getRetrievableCarByCustomerSvc = async (customerId) => {
  try {
    return await getRetrievableCarByCustomerMdl(customerId);
  } catch (error) { }
};
export const retrieveCarSvc = async (data) => {
  try {
    return await retrieveCarMdl(data);
  } catch (error) {
    console.log(error);
  }
};
