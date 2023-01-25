import {
  getCarDepotSvc,
  getUnconfirmedCarDepotSvc,
  insertTodoSvc,
  pushCarDepotSvc
} from "../services/repairs.service.js";

/*
 * car depot
 */
export const pushCarDepotHandler = async (req, res) => {
  try {
    const data = await pushCarDepotSvc(req.body);

    return res.status(200).json({ message: "insert carDepot", data });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
export const getCarDepotHandler = async (req, res) => {
  try {
    const myData = await getCarDepotSvc(req.params.id);
    return res.status(200).json(myData);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getUnconnectedCarDepotHandler = async (req, res) => {
  try {
    const data = await getUnconfirmedCarDepotSvc();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

/*
 * to do
 */
export const insertToDoCtrl = async (req, res) => {
  try {
    const data = await insertTodoSvc(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.status);
  }
};
