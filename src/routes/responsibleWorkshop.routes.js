import express from "express";
import {
  insertToDoCtrl,

} from "../controllers/responsibleWorkshop.controller.js";
const router = express.Router();

router.post("/", insertToDoCtrl);

export { router as ResponsibleWorkshopRoute };
