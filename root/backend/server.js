require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// import routes
const authRoute = require("./routes/Auth");
const workoutRoute = require("./routes/Workouts");

const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/auth", workoutRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
