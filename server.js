const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// routes
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/auth", authRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
