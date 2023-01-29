import {
  confirmRepairSvc,
  getAllRepairSvc,
  getRepairByCustomerAndRepairSvc,
  getRepairsByCustomerSvc,
  getUnconfirmedRepairSvc,
  insertRepairSvc,
  insertTodoSvc
} from "../services/repair.service.js";

/*
 * car depot
 */
export const insertRepairsCtrl = async (req, res) => {
  try {
    const data = await insertRepairSvc(req.body);
    return res.status(200).json({ message: "insert carDepot", data });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getRepairByCustomerCtrl = async (req, res) => {
  try {
    const myData = await getRepairsByCustomerSvc(req.params.id);
    return res.status(200).json(myData);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getUnconfirmedRepairsSvc = async (req, res) => {
  try {
    const data = await getUnconfirmedRepairSvc();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
/*
 * @params req :
 *  1-id of the customer
 *  2-id of the repair to confirm
 *  3-to of the repair to confirm
 */
export const confirmRepairCtrl = async (req, res) => {
  try {
    const data = await confirmRepairSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.status);
  }
};
export const getRepairByCustomerByIdCtrl = async (req, res) => {
  try {
    const data = await getRepairByCustomerAndRepairSvc(
      req.params.customerId,
      req.params.repairsId
    );
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getAllRepairCtrl = async (req, res) => {
  try {
    const data = await getAllRepairSvc(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const insertTodoCtrl = async (req, res) => {
  const data = await insertTodoSvc(req.body)
  return res.status(200).json(data)
}
