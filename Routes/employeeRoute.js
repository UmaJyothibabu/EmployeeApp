const router = require("express").Router();
const employeeData = require("../Models/employee");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/employeelist", auth, async (req, res) => {
  try {
    // console.log(req.body.role);
    let employees = await employeeData.find();

    res.json(employees);
  } catch (error) {
    res.json({ message: "Unable to load data", error: error.message });
  }
});

router.get("/employeelist/:id", auth, async (req, res) => {
  try {
    const eId = req.params.id;
    console.log(eId);
    const data = await employeeData.findById(eId);

    res.status(200).json(data);
  } catch (error) {
    res.json({ message: "Unable to load data", error: error.message });
  }
});

router.post("/employeelist", auth, async (req, res) => {
  try {
    const item = req.body;
    console.log(item);

    // item.date_of_joining = ISODate(item.date_of_joining);
    if (req.body.role === "admin") {
      const newData = employeeData(item);
      const saveData = await newData.save();
      res.status(200).json({ message: "Employee added Successful" });
    } else {
      res.json({ message: "Only Admin can add employee" });
    }
  } catch (error) {
    res.status(400).json({ message: "Unable to post", error: error.message });
  }
});

router.delete("/employeelist/:id", auth, async (req, res) => {
  try {
    if (req.body.role === "admin") {
      const { id } = req.params;
      console.log(id);
      const deleted = await employeeData.findByIdAndDelete(id);
      console.log("Deleted");
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.json({ message: "Only Admin can delete" });
    }
  } catch (error) {
    res.status(400).json({ message: "Unable to delete", error: error.message });
  }
});

router.put("/employeelist/:id", auth, async (req, res) => {
  try {
    if (req.body.role === "admin") {
      const item = req.body;
      console.log(item);
      const { id } = req.params;
      const updated = await employeeData.findByIdAndUpdate(id, req.body);
      res.json({ message: "Updated successfully" });
    } else {
      res.json({
        message: "Only Admin can Update",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Unable to update", error: error.message });
  }
});

module.exports = router;
