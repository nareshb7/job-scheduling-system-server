const express = require("express")
require('dotenv').config();
require("./DBConnection");
const routes = require("./routes")

const PORT = 3001;

const app = express();

app.use(express.json())
app.use("/api", routes)

app.listen(PORT, () => console.log('Server is running..!'))