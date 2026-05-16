import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import company_router from "./routes/company_routes.js";
import user_router from "./routes/user_routes.js";

const app = express();

app.use(express.json());
app.use("/api", company_router);
app.use("/api", user_router);

connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
