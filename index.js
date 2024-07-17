import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./Configuration/Db.js";
import authRoutes from "./Routes/authRoutes.js";
import listRoutes from "./Routes/listRoutes.js";
import path from "path";
import cors from "cors";

//configure env
dotenv.config();

const __dirname = path.resolve();

//databse config
connectDatabase();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
