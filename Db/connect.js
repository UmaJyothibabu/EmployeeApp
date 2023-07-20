const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log("Connected to atlas");
  })
  .catch(() => {
    console.log("Error!! DB Connection lost");
  });
