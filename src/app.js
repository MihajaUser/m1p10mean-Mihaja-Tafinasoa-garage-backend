import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import { CustomerRoute } from "./routes/customer.routes.js";
const app = express();

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

// app.use("/api/statistics", StatisticRoute);
app.use("/api/customers", CustomerRoute);
//
// app.use("/api/seeds", SeedRoute);

export { app };
