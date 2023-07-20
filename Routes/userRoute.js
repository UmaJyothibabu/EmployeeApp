const router = require("express").Router();
const userData = require("../Models/user");
const jwt = require("jsonwebtoken");

// User  login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let data = await userData.findOne({
    username: username,
  });
  console.log(data);
  if (!data) res.json({ message: "User not found" });
  try {
    console.log(data.password);
    console.log(password);
    if (data.password === password) {
      jwt.sign(
        { email: username, id: data._id, role: data.role },
        "ict",
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.json({ message: "Token not generated" });
          } else {
            res.json({
              message: "Login Successfully",
              token: token,
              data: data,
            });
          }
        }
      );
    } else {
      res.json({ message: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

// User Sign up
router.post("/signup", async (req, res) => {
  try {
    req.body.role = "user";
    console.log(req.body);
    const newUser = userData(req.body);
    const saveData = await newUser.save();
    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.json({ message: "Unable to post", error: error.message });
  }
});

module.exports = router;
