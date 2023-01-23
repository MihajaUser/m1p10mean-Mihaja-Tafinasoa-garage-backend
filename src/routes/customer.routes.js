import express from "express";
import { signUpCustomerHandler } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);

export { router as CustomerRoute };
