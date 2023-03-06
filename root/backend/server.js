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
const addWorkoutRoute = require("./routes/AddWorkouts");
const retrieveWorkoutRoute = require("./routes/RetrieveWorkouts");

const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/auth", addWorkoutRoute);
app.use("/api/auth", retrieveWorkoutRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
