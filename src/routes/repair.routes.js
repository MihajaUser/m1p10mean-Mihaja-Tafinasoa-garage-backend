import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getRepairByCustomerByIdCtrl
} from "../controllers/repair.controller.js";
const router = express.Router();

// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
router.get("/:customerId/:repairsId", getRepairByCustomerByIdCtrl);
router.post("/confirm/:id", confirmRepairCtrl);

//
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
