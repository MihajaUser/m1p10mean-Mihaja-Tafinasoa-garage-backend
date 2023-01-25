import express from "express";
import { insertToDoCtrl } from "./../controllers/workshopManager.controller.js";
const router = express.Router();
router.post("/", insertToDoCtrl);

export { router as WorkshopManagerRoute };
