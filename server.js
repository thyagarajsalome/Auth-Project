const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB (make sure MongoDB is running)
mongoose
  .connect("mongodb://localhost:27017/authdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Use auth routes (e.g., /api/auth/signup and /api/auth/signin)
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
