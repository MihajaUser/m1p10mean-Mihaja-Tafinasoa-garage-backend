import { findCustomerByIdMdl } from "../models/customer.model.js";
import {
  getCarDepotMdl,
  getUnconfirmedCarDepotMdl,
  insertTodoMdl,
  pushCarDepotMdl
} from "../models/repair.model.js";

/*
 *depot car
 */
export const pushCarDepotSvc = async (depot) => {
  const user = await findCustomerByIdMdl(depot._id);
  return await pushCarDepotMdl(user, depot);
};

export const getCarDepotSvc = async (id) => {
  try {
    const repairs = await getCarDepotMdl(id);
    return repairs;
  } catch (error) {
    console.log(error);
  }
};

export const getUnconfirmedCarDepotSvc = async () => {
  return await getUnconfirmedCarDepotMdl();
};

//
export const insertTodoSvc = async (data) => {
  try {
    return await insertTodoMdl(data);
  } catch (error) {
    console.log(error);
  }
};
