import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

// activate dotenv
dotenv.config();

//  connect to mongo atlas
mongoose
  .connect(process.env.MONGO_DEV)
  .then(console.log("Success connect to database"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

// allow json as an input
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
