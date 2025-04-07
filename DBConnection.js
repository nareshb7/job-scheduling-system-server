const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongodb is Connected"))
  .catch((err) => console.log("Error in DB connection", err.message));
