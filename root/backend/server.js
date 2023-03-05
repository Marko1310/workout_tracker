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

//controllers
const register = require("./controllers/register");
const login = require("./controllers/login");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   ssl: true,
});

const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//register route
app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, pool, bcrypt);
});

//login route
app.post("/api/login", (req, res) => {
  login.handleLogin(req, res, pool, bcrypt, cookieParser, jwt);
});
