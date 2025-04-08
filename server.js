const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./DBConnection");
const routes = require("./routes");

const PORT = 3001;

const app = express();

app.use(cors());
app.set("trust proxy", true);
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: false }));

app.use("/api", routes);

app.listen(PORT, () => console.log("Server is running..!"));
