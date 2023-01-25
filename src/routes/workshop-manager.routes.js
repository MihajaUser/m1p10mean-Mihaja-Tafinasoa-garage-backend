import express from "express";
import { insertToDoCtrl } from "../controllers/workshop-manager.controller.js";
const router = express.Router();
router.post("/to-do", insertToDoCtrl);

export { router as WorkshopManagerRoute };
