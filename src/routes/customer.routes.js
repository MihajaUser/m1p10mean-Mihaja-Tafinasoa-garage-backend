import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);

export { router as CustomerRoute };
