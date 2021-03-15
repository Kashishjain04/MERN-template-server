import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRoutes from "./routes/AppRoute.js";

// Create a .env file in /server directory and add the following line in it:
// CONNECTION_URL={mongodb connection string}

// initialize app
const app = express();
dotenv.config();

// middlewares
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser
app.use(cors()); // enables http requests

// configure db
const db = mongoose.connection;
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8080; // 8080 === development port
const DEPRECATED_FIX = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB:", error)); // listen for errors on initial connection

db.on("error", (error) => console.log("❌ MongoDB:", error)); // listen for errors after the connection is established (errors during the session)
db.on("disconnected", () => console.log("❌ MongoDB disconnected"));

// routes
app.get("/", (req, res) => {
  res.send("Hello World - Express.js");
});

// extended routes {example: "/app/data"}
app.use("/app", AppRoutes);

app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
