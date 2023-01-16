import express from "express";
import { getAllCustomerHandler } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getAllCustomerHandler);

export { router as CustomerRoute };
