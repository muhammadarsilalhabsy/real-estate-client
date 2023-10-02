import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Jalan gaes");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
