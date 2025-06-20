require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRoute = require("./routes/items");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemsRoute);
// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
