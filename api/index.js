import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import listingRoute from "./routes/listing.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
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

// disable cors
app.use(cors());

// allow json as an input
app.use(express.json());

// cookie
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/listing", listingRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    msg: message,
  });
});
