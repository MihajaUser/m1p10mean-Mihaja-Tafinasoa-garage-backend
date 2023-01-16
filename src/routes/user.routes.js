import express from "express";
import {
  insertUserCtrl,
  loginUserCtrl,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", insertUserCtrl);
router.post("/login", loginUserCtrl);
export { router as UserRoute };
