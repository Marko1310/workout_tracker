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
    const { title, days } = req.body;

    const split = await pool.query(
      "INSERT INTO splits (split_name, user_id, days) VALUES ($1, $2, $3) RETURNING *",
      [title, user_id, days]
    );
    res.json(split.rows[0]);
  } catch {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
