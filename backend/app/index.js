import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use("/api", router);

connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
