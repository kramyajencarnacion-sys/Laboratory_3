const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/students", studentRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Encarnacion Student API is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
