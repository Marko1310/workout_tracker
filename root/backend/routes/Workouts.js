const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const requiresAuth = require("../middleware/permission");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   ssl: true,
});

// @route   GET /api/splits/test
// @desc    Test the splits route
// @access  Public
router.get("/test", (req, res) => {
  res.json("Test working");
});

// @route   POST /api/splits/new
// @desc    Create new split
// @access  Private
router.post("/split/new", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { title, days } = req.body;

    const split = await pool.query(
      "INSERT INTO splits (split_name, user_id, days, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, user_id, days, date]
    );
    res.json(split.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/current
// @desc    get user splita
// @access  Private
router.get("/splits/current", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const splits = await pool.query(
      "SELECT * FROM splits WHERE user_id=$1 ORDER BY date DESC",
      [user_id]
    );
    res.json(splits.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
