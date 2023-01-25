import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
  pushCarDepotHandler,
  getCarDepotHandler,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);
/*
 *
 */
router.post("/car-depot/:id", pushCarDepotHandler);
router.get("/car-deport/:id", getCarDepotHandler);

export { router as CustomerRoute };
