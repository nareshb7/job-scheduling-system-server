const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./DBConnection");
const routes = require("./routes");

const PORT = 3001;

const app = express();
const allowedOrigins = [process.env.LOCAL_URL, process.env.LIVE_URL];
app.use(cors());
app.set("trust proxy", true);
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: false }));

const middleware = (req, res, next) => {
  const origin = req.get("Origin");
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send("Origin not allowed");
  }
  const url = `${origin}${req.originalUrl}`;
  console.log("Origin URL:", url);
  next();
};

app.use("/api", middleware, routes);

app.listen(PORT, () => console.log("Server is running..!"));
