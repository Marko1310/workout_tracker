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

//      EDITING DATA     //
///////////////////////////////
// @route   DELETE /api/split/delete
// @desc    Delete split
// @access  Private
router.delete("/split/delete", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { split_id } = req.body;

    const checkSplitId = await pool.query(
      "SELECT * FROM splits WHERE split_id = $1 AND user_id = $2",
      [split_id, user_id]
    );

    if (checkSplitId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const deletedSplit = await pool.query(
      "DELETE FROM splits WHERE split_id = $1 AND user_id = $2 RETURNING *",
      [split_id, user_id]
    );
    res.json(deletedSplit.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   DELETE /api/split/workout/delete
// @desc    Delete workout in a split
// @access  Private
router.delete("/split/workout/delete", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { split_id, workout_id } = req.body;

    const checkSplitId = await pool.query(
      "SELECT * FROM splits WHERE split_id = $1 AND user_id = $2",
      [split_id, user_id]
    );

    if (checkSplitId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const checkWorkoutId = await pool.query(
      "SELECT * FROM workouts WHERE workout_id = $1 AND user_id = $2",
      [workout_id, user_id]
    );

    if (checkWorkoutId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const deletedWorkout = await pool.query(
      "DELETE FROM workouts WHERE workout_id = $1 AND user_id = $2 RETURNING *",
      [split_id, user_id]
    );
    res.json(deletedWorkout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
