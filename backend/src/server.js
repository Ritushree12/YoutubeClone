import dotenv from "dotenv";
dotenv.config();

import express from "express";
import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

/* Serve uploaded files */
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
