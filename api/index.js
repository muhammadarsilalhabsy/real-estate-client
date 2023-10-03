import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_DEV)
  .then(console.log("Success connect to database"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

//  connect to mongo atlas

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.use("/api/v1", userRoute);
