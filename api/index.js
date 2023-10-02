import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(console.log("Success connect to database"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

//  connect to mongo atlas

app.get("/", (req, res) => {
  res.send("Jalan gaes");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
