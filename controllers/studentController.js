const db = require("../config/db");

// GET all students
const getAllStudents = (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve students", details: err.message });
    }
    res.status(200).json(results);
  });
};

// GET student by ID
const getStudentById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve student", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }
    res.status(200).json(results[0]);
  });
};

// POST - Insert a new student
const createStudent = (req, res) => {
  const { firstName, lastName, age, course } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "firstName and lastName are required" });
  }

  const sql = "INSERT INTO students (firstName, lastName, age, course) VALUES (?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, age, course], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create student", details: err.message });
    }
    res.status(201).json({
      message: "Student created successfully",
      student: { id: result.insertId, firstName, lastName, age, course },
    });
  });
};

// PUT - Update entire student record
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, course } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "firstName and lastName are required" });
  }

  const sql = "UPDATE students SET firstName = ?, lastName = ?, age = ?, course = ? WHERE id = ?";
  db.query(sql, [firstName, lastName, age, course, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update student", details: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }
    res.status(200).json({
      message: "Student updated successfully",
      student: { id: parseInt(id), firstName, lastName, age, course },
    });
  });
};

// PATCH - Update specific fields of a student
const patchStudent = (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  const allowedFields = ["firstName", "lastName", "age", "course"];
  const updates = [];
  const values = [];

  for (const key of Object.keys(fields)) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ error: `Invalid field: ${key}` });
    }
    updates.push(`${key} = ?`);
    values.push(fields[key]);
  }

  values.push(id);
  const sql = `UPDATE students SET ${updates.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to patch student", details: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }
    res.status(200).json({ message: "Student partially updated successfully", updatedFields: fields });
  });
};

// DELETE - Remove a student
const deleteStudent = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete student", details: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }
    res.status(200).json({ message: `Student with ID ${id} deleted successfully` });
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
};
