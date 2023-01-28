import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getRepairByCustomerByIdCtrl,
  getAllRepairCtrl
} from "../controllers/repair.controller.js";
const router = express.Router();

router.get("", getAllRepairCtrl);

// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
router.post("/confirm/:id", confirmRepairCtrl);
//
router.get("/customer/:customerId/:repairsId", getRepairByCustomerByIdCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
