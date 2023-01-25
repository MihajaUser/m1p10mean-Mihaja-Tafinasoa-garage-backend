import express from "express";
import { checkJwt, checkRole } from "./../middlewares/jwt.js";
import {
  insertUserCtrl,
  loginUserCtrl,
  tokenTest
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", insertUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/token", [checkJwt, checkRole(["wsr"])], tokenTest);
export { router as UserRoute };
