import express from "express";
import {
  signUpCustomerHandler,
  signInCustomerHandler,
  pushCarDepotHandler,
  getCarDepotHandler,
  getCarConfirmationHandler
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", signUpCustomerHandler);
router.post("/login", signInCustomerHandler);
/*
 *
 */
router.post("/car-depot", pushCarDepotHandler);
router.get("/car-depot/:id", getCarDepotHandler);
router.get("/is-confirmed/:id/:confirmation", getCarConfirmationHandler);

export { router as CustomerRoute };
