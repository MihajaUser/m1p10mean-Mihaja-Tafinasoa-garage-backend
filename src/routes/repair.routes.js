import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc
} from "../controllers/repair.controller.js";
const router = express.Router();
// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
// to do
router.post("/confirm/:id", confirmRepairCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
