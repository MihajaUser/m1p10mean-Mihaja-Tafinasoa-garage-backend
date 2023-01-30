// import express from "express";
import http from "http";
import { app } from "./app.js";
import config from "config";

const port = config.get("server.port");

const server = http.createServer(app);
server.listen(0, () => {
  console.log(`Server started on port: ${server.address().port}`);
});
