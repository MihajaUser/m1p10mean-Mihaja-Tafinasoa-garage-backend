import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getRepairByCustomerByIdCtrl,
  getAllRepairCtrl,
  getUnpaidRepairCtrl,
  insertTodoCtrl,
  insertPaymentCtrl,
  geRetrievableCarByCustomerCtrl,
  getUndoneToDoCtrl,
  validationToDoCtrl,
  retrieveCarCtrl,
  getAllUndoneRepairCtrl
} from "../controllers/repair.controller.js";

const router = express.Router();

router.get("", getAllRepairCtrl);
// * repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
router.post("/confirm/:id", confirmRepairCtrl);
router.get("/unpaid/:customerId", getUnpaidRepairCtrl);
router.post("/todo/:id/validation", validationToDoCtrl);
router.get("/undone", getAllUndoneRepairCtrl);
// * do to
router.post("/:idRepair/to-do", insertTodoCtrl);
router.get("/todo/undone", getUndoneToDoCtrl);
// * payment
router.post("/payment", insertPaymentCtrl);
// * cars
router.get("retrievable/:customerId", geRetrievableCarByCustomerCtrl);
router.post("/recuperation/:customerId", retrieveCarCtrl);
// * order
router.get("/customer/:customerId/:repairsId", getRepairByCustomerByIdCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
