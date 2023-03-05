const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   ssl: true,
});

// @route   GET /api/auth/test
// @desc    Test the auth route
// @access  Public
router.get("/test", (req, res) => {
  res.send("route working");
});

// @route   POST /api/auth/register
// @desc    Create a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // check for an existing user
    const existingEmail = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (existingEmail.rows.length !== 0) {
      return res
        .status(400)
        .json({ error: "There is already a user with this email" });
    }
    // check the proper name
    if (name === "") {
      return res.status(400).json({ error: "name field can not be empty" });
    }

    // check the proper email
    if (email === "" || !emailRegex.test(email)) {
      return res.status(400).json({ error: "not a proper email" });
    }

    // check the proper password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password has to be at least 6 characters long" });
    }

    // if no errors -> create a new user
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    const userCredentials = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
    };
    res.json(userCredentials);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// @route   POST /api/auth/login
// @desc    Login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    /////////
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // if user does not exist
    if (user.rows.length === 0) {
      return res.json({ error: "Something is wrong with your credentials" });
    }
    // is password is invalid
    const isValid = await bcrypt.compareSync(password, user.rows[0].password);
    if (!isValid) {
      return res.json({ error: "Something is wrong with your credentials" });
    }

    const payload = { userId: user.rows[0].id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // return everything except the password
    const userCredentials = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
    };
    res.json({ user: userCredentials, token: token });
  } catch {
    res.status(500).send(err.message);
  }
});

module.exports = router;
