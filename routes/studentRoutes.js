const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
} = require("../controllers/studentController");

// GET all students
router.get("/", getAllStudents);

// GET student by ID
router.get("/:id", getStudentById);

// POST - create new student
router.post("/", createStudent);

// PUT - full update
router.put("/:id", updateStudent);

// PATCH - partial update
router.patch("/:id", patchStudent);

// DELETE - remove student
router.delete("/:id", deleteStudent);

module.exports = router;
