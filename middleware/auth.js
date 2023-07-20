const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.body.token;
  // let role = req.body.userRole;
  if (!req.body.token) {
    const authHeader = req.headers["authorization"];
    // role = req.headers["role"];
    // console.log(role);
    console.log(authHeader);
    token = authHeader && authHeader.split(" ")[1];
    console.log(token);
  }

  jwt.verify(token, "ict", (err, decoded) => {
    if (decoded && decoded.email) {
      req.body.token = token;
      // console.log("role of user", decoded);
      req.body.role = decoded.role;
      next();
    } else {
      return res.json({ message: "Unauthorised user" });
    }
  });
};
module.exports = auth;
