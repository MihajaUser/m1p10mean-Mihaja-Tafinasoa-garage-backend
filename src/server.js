// import express from "express";
import http from "http";
import { app } from "./app.js";
import config from "config";

const port = config.get("server.port");

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
