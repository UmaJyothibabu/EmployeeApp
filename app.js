const express = require("express");
const app = new express();
const path = require("path");

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/build")));

require("dotenv").config();
require("./Db/connect");

PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const employeeRouter = require("./Routes/employeeRoute");
app.use("/api", employeeRouter);

const userRouter = require("./Routes/userRoute");
app.use("/api", userRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
