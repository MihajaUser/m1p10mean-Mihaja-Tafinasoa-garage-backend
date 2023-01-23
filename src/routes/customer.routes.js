import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
  insertCarDepotHandler,
  carrepairsHandler
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);
router.post("/cardepot", insertCarDepotHandler)
router.get("/carrepairs/:id", carrepairsHandler)

export { router as CustomerRoute };
