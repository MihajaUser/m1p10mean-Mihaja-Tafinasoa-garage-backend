import {
  confirmRepairSvc,
  getAllRepairSvc,
  getRepairByCustomerAndRepairSvc,
  getRepairsByCustomerSvc,
  getRetrievableCarByCustomerSvc,
  getUnconfirmedRepairSvc,
  getUnpaidRepairSvc,
  insertPaymentSvc,
  insertRepairSvc,
  insertTodoSvc,
  validationToDoSvc,
  carRecuparationSvc
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
    const data = await validationToDoSvc(req.body)
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
};
export const carRecuparationCtrl = async (req, res) => {
  try {
    const data = await carRecuparationSvc(req.body);
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
};