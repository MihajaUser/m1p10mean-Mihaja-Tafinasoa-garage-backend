import express from "express";
import config from "config";
import bodyParser from "body-parser";
import cors from "cors";
// import { CustomerRoute } from "./routes/customer.routes.js";
import mongoose from "mongoose";
import { UserRoute } from "./routes/user.routes.js";
import { CustomerRoute } from "./routes/customer.routes.js";
// import { MongoClient } from "mongodb";

// const mongodb = require("mongodb");
const app = express();
/**
 * * _________database
 */
mongoose.set("strictQuery", false);
mongoose.connect(config.get("database.uri"));

// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
console.log("database connected successfully");
/**
 * * _________app configuration
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(cors());
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: "SECRET",
//   })
// );
/**
 * * _________routes
 */
app.use("/api/users", UserRoute);
app.use("/api/customers", CustomerRoute);

export { app, db };
