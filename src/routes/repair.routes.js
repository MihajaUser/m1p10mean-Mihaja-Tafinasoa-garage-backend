import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc
} from "../controllers/repair.controller.js";
const router = express.Router();
// repairs
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
// to do
router.post("/confirm/:id", confirmRepairCtrl);

export { router as RepairRoute };
