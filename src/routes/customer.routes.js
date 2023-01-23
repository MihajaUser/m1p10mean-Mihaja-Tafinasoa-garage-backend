import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
  insertCarDepot,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);
router.post("/cardepot", insertCarDepot)

export { router as CustomerRoute };
