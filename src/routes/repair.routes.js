import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getRepairByCustomerByIdCtrl,
  getAllRepairCtrl,
  getUnpaidRepairCtrl,
  insertTodoCtrl,
  insertPaymentCtrl,
  geRetrievableCarByCustomerCtrl,
  getUndoneToDoCtrl,
  validationToDoCtrl,
  retrieveCarCtrl,
  getAllUndoneRepairCtrl,
  getAllUnpaidRepairCtrl,
  getAllRepairByCustomerCtrl,
  getUnconfirmedRepairsCtrl
} from "../controllers/repair.controller.js";
import { checkJwt, checkRole } from "./../middlewares/jwt.js";

const router = express.Router();
router.get("", getAllRepairCtrl);
// * repairs
router.get(
  "/unconfirmed",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  getUnconfirmedRepairsCtrl
);
router.post(
  "/confirm/:id",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  confirmRepairCtrl
);
router.get(
  "/unpaid/:customerId",
  // [checkJwt, checkRole(["ctmr", "ra", "rf"], 0)],
  getUnpaidRepairCtrl
);
router.get(
  "/unpaid",
  // [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  getAllUnpaidRepairCtrl
);
router.post(
  "/todo/:id/validation",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  validationToDoCtrl
);
router.get(
  "/undone",
  [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  getAllUndoneRepairCtrl
);
router.get(
  "/customer/:customerId",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  getAllRepairByCustomerCtrl
);

// * do to
router.post(
  "/:idRepair/to-do",
  [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  insertTodoCtrl
);
router.get(
  "/todo/undone",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  getUndoneToDoCtrl
);
// * payment
router.post(
  "/payment",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 1)],
  insertPaymentCtrl
);
// * cars
router.get(
  "/retrievable/:customerId",
  // [checkJwt, checkRole(["ctmr", "ra", "rf"], 0)],
  geRetrievableCarByCustomerCtrl
);
router.post(
  "/recuperation/:customerId",
  [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  retrieveCarCtrl
);

// * order
router.get(
  "/customer/:customerId/:repairsId",
  // [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  getRepairByCustomerByIdCtrl
);
router.post(
  "/:id",
  [checkJwt, checkRole(["ctmr", "ra", "rf"], 0)],
  insertRepairsCtrl
);
router.get(
  "/:id",
  [checkJwt, checkRole(["ctmr", "ra", "rf"])],
  getRepairByCustomerCtrl
);

export { router as RepairRoute };
