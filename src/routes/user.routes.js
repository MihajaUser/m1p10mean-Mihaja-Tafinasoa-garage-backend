import express from "express";
import { insertUserCtrl } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", insertUserCtrl);

export { router as UserRoute };
