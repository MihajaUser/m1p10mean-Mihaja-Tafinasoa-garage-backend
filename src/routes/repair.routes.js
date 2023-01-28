import express from "express";
import {
  getRepairByCustomerCtrl,
  insertRepairsCtrl,
  confirmRepairCtrl,
  getUnconfirmedRepairsSvc,
  getAvancementRepairsCtrl,
  getTest
} from "../controllers/repair.controller.js";
const router = express.Router();
router.get("/avancement/:customerId/:repairId", getAvancementRepairsCtrl)
router.post("/test", getTest)
// repairs
router.get("/unconfirmed", getUnconfirmedRepairsSvc);
// to do
router.post("/confirm/:id", confirmRepairCtrl);
router.post("/:id", insertRepairsCtrl);
router.get("/:id", getRepairByCustomerCtrl);

export { router as RepairRoute };
