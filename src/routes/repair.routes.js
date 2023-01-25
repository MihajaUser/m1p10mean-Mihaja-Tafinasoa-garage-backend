import express from "express";
import {
  getCarDepotHandler,
  getUnconnectedCarDepotHandler,
  insertToDoCtrl,
  pushCarDepotHandler
} from "../controllers/repair.controller.js";
const router = express.Router();
// repairs
router.post("/:id", pushCarDepotHandler);
router.get("/:id", getCarDepotHandler);
router.get("/unconfirmed", getUnconnectedCarDepotHandler);
// to oos
router.post("/to-do", insertToDoCtrl);

export { router as RepairRoute };
