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
  validationToDoCtrl,
  carRecuparationCtrl
} from "../controllers/repair.controller.js";

const router = express.Router();

router.get("", getAllRepairCtrl);
// * repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
router.post("/confirm/:id", confirmRepairCtrl);
router.get("/unpaid/:customerId", getUnpaidRepairCtrl);
router.post("/todo/:id/validation", validationToDoCtrl)
// * do to
router.post("/:idRepair/to-do", insertTodoCtrl);
// * payment
router.post("/payment", insertPaymentCtrl);
// * cars
router.get("retrievable/:customerId", geRetrievableCarByCustomerCtrl);
router.post("/recuperation/:customerId", carRecuparationCtrl);
// * order
router.get("/customer/:customerId/:repairsId", getRepairByCustomerByIdCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
