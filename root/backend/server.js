require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

//controllers
const register = require("./controllers/register");
const login = require("./controllers/login");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//register route
app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, pool);
});
