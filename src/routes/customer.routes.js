import { SignupHandler } from "../controllers/customer.controller";

const express = require("express");
const router = express.Router();

router.get("/", SignupHandler);

export { router as CustomerRoute };
