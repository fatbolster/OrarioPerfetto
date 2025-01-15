const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const addRoutes = require("./routes/add")
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/add", addRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
