import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
  paymentCtrl
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);
router.post("/payment", paymentCtrl);

export { router as CustomerRoute };
