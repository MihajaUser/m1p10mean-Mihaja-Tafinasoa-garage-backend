import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getRepairByCustomerByIdCtrl,
  getAllRepairCtrl,
  insertTodoCtrl
} from "../controllers/repair.controller.js";
import { getUnconfirmedRepairSvc } from "../services/repair.service.js";
const router = express.Router();

router.get("", getAllRepairCtrl);
// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
router.post("/confirm/:id", confirmRepairCtrl);
router.get("/unpaid/:customerId", getUnconfirmedRepairSvc);
//todo
router.post("/:idRepair/to-do", insertTodoCtrl);
//
router.get("/customer/:customerId/:repairsId", getRepairByCustomerByIdCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
