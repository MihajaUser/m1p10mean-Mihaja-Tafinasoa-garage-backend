import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getAvancementRepairsCtrl
} from "../controllers/repair.controller.js";
const router = express.Router();
router.get("/avancement/:customerId/:repairId", getAvancementRepairsCtrl)
// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
// to do
router.post("/confirm/:id", confirmRepairCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
