const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const requiresAuth = require("../middleware/permission");
const databaseCheck = require("../middleware/databaseChecks");

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
    const isValidSplitId = await databaseCheck.checkSplitId(split_id, user_id);
    if (isValidSplitId === 0) {
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

    const isValidSplitId = await databaseCheck.checkSplitId(split_id, user_id);
    if (isValidSplitId === 0) {
      return res.status(400).send("Unathorized");
    }

    const isValidWorkoutId = await databaseCheck.checkWorkoutId(
      workout_id,
      split_id,
      user_id
    );
    if (isValidWorkoutId === 0) {
      return res.status(400).send("Unathorized");
    }

    const deletedWorkout = await pool.query(
      "DELETE FROM workouts WHERE workout_id = $1 AND user_id = $2 RETURNING *",
      [workout_id, user_id]
    );
    res.json(deletedWorkout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
