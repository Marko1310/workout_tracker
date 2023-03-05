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

//      ADDING DATA     //
///////////////////////////////
// @route   POST /api/splits/new
// @desc    Create new split
// @access  Private
router.post("/split/new", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { title, days } = req.body;

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    if (days === 0 || days < 1 || days > 7) {
      return res
        .status(400)
        .json({ days: "Days field should be between 1 and 7" });
    }

    const split = await pool.query(
      "INSERT INTO splits (split_name, user_id, days, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, user_id, days, date]
    );
    res.json(split.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/new
// @desc    Create new workout in the workout split
// @access  Private
router.post("/split/workout/new", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { title, split_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    const checkSplitId = await pool.query(
      "SELECT * FROM splits WHERE split_id = $1",
      [split_id]
    );
    console.log(checkSplitId.rows);

    if (checkSplitId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const workout = await pool.query(
      "INSERT INTO workouts (workout_name, date, split_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, date, split_id, user_id]
    );
    res.json(workout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/new
// @desc    Create new exercise in the workout split
// @access  Private
router.post("/split/workout/exercise/new", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { title, goal_sets, workout_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    if (goal_sets < 0) {
      return res
        .status(400)
        .json({ sets: "Number of sets must be greater then 0" });
    }

    const checkWorkoutId = await pool.query(
      "SELECT * FROM workouts WHERE workout_id = $1",
      [workout_id]
    );

    if (checkWorkoutId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const exercise = await pool.query(
      "INSERT INTO exercises (exercise_name, goal_sets, date, workout_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, goal_sets, date, workout_id, user_id]
    );

    res.json(exercise.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/track/new
// @desc    Create new exercise in the workout split
// @access  Private
router.post("/split/workout/exercise/new", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { title, goal_sets, workout_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    if (goal_sets < 0) {
      return res
        .status(400)
        .json({ sets: "Number of sets must be greater then 0" });
    }

    const checkWorkoutId = await pool.query(
      "SELECT * FROM workouts WHERE workout_id = $1",
      [workout_id]
    );

    if (checkWorkoutId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const exercise = await pool.query(
      "INSERT INTO exercises (exercise_name, goal_sets, date, workout_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, goal_sets, date, workout_id, user_id]
    );

    res.json(exercise.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//      RETRIEVING DATA     //
///////////////////////////////
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
