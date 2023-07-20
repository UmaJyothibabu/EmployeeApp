const express = require("express");
const app = new express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/build")));

require("dotenv").config();
// require("./Db/connect");

PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const employeeRouter = require("./Routes/employeeRoute");
app.use("/api", employeeRouter);

const userRouter = require("./Routes/userRoute");
app.use("/api", userRouter);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongodb_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

// mongoose
//   .connect(process.env.mongodb_url)
//   .then(() => {
//     console.log("Connected to atlas");
//     app.listen(PORT, () => {
//       console.log(`The server is running on port ${PORT}`);
//     });
//   })
// .catch(() => {
//   console.log("Error!! DB Connection lost");
// });
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
