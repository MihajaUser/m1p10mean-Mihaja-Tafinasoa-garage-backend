import {
  confirmRepairSvc,
  getAllRepairSvc,
  getRepairByCustomerAndRepairSvc,
  getRepairsByCustomerSvc,
  getRetrievableCarByCustomerSvc,
  getUnDoneTodoSvc,
  getUnconfirmedRepairSvc,
  getUnpaidRepairSvc,
  insertPaymentSvc,
  insertRepairSvc,
  insertTodoSvc,
  validationToDoSvc,
  retrieveCarSvc,
  getAllUndoneRepairsSvc
} from "../services/repair.service.js";
// * repairs
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
export const confirmRepairCtrl = async (req, res) => {
  try {
    console.log("Bonjour");
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
export const getUnpaidRepairCtrl = async (req, res) => {
  try {
    const data = await getUnpaidRepairSvc(req.params.customerId);
    return res.status(200).json(data[0]);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
export const getAllUndoneRepairCtrl = async (req, res) => {
  try {
    const data = await getAllUndoneRepairsSvc();
    return res.status(200).json(data);
  } catch (error) {}
};
// * todo
export const insertTodoCtrl = async (req, res) => {
  try {
    const data = await insertTodoSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
export const getUndoneToDoCtrl = async (req, res) => {
  console.log("ctrl");
  try {
    const data = await getUnDoneTodoSvc();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
// * payment
export const insertPaymentCtrl = async (req, res) => {
  try {
    const payment = await insertPaymentSvc(req.body);
    res.status(200).json(payment);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
// * retrieving car
export const geRetrievableCarByCustomerCtrl = async (req, res) => {
  try {
    const data = await getRetrievableCarByCustomerSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
export const validationToDoCtrl = async (req, res) => {
  try {
    const data = await validationToDoSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
export const retrieveCarCtrl = async (req, res) => {
  try {
    const data = await retrieveCarSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
