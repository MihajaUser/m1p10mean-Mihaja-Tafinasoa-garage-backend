import express from "express";
import { getAllCustomerHandler } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", getAllCustomerHandler);

export { router as CustomerRoute };
