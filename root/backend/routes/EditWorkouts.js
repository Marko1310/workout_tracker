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
    console.log(split_id);

    const checkSplitId = await pool.query(
      "SELECT * FROM splits WHERE split_id = $1 AND user_id = $2",
      [split_id, user_id]
    );

    if (checkSplitId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const deletedSplit = await pool.query(
      "DELETE FROM splits WHERE split_id = $1 RETURNING *",
      [split_id]
    );
    res.json(deletedSplit.rows);
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
    console.log(title);
    console.log(split_id);

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    const checkSplitId = await pool.query(
      "SELECT * FROM splits WHERE split_id = $1 AND user_id = $2",
      [split_id, user_id]
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
    const { title, goal_sets, goal_reps, workout_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: "Title field can not be empty" });
    }

    if (goal_sets < 0) {
      return res
        .status(400)
        .json({ sets: "Number of sets must be greater then 0" });
    }

    const checkWorkoutId = await pool.query(
      "SELECT * FROM workouts WHERE workout_id = $1 AND user_id = $2",
      [workout_id, user_id]
    );

    if (checkWorkoutId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const exercise = await pool.query(
      "INSERT INTO exercises (exercise_name, goal_sets, goal_reps, date, workout_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, goal_sets, goal_reps, date, workout_id, user_id]
    );

    res.json(exercise.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/set
// @desc    Add new set to a given exercises of a certain workout
// @access  Private

router.post(
  "/split/workout/exercise/set/new",
  requiresAuth,
  async (req, res) => {
    try {
      user_id = req.user.id;
      const date = new Date();
      const { exercise_id } = req.body;
      console.log(exercise_id);

      const checkExerciseId = await pool.query(
        "SELECT * FROM exercises WHERE exercise_id = $1 AND user_id = $2",
        [exercise_id, user_id]
      );

      if (checkExerciseId.rows.length === 0) {
        return res.status(400).send("Unathorized");
      }

      const lastSet = await pool.query(
        "SELECT set FROM track WHERE exercise_id = $1 AND user_id = $2 ORDER BY date DESC LIMIT 1;",
        [exercise_id, user_id]
      );

      if (lastSet.rows[0]) {
        let nextSet = lastSet.rows[0].set + 1;
        const insertSet = await pool.query(
          "INSERT INTO track (set, weight, reps, date, exercise_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [nextSet, 0, 0, date, exercise_id, user_id]
        );
        res.json(insertSet.rows);
      } else {
        const insertSet = await pool.query(
          "INSERT INTO track (set, weight, reps, date, exercise_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [1, 0, 0, date, exercise_id, user_id]
        );
        res.json(insertSet.rows);
      }
      // const insertSet = await pool.query(
      //   "INSERT INTO track (set, weight, reps, date, exercise_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      //   [1, 0, 0, date, exercise_id, user_id]
      // );
      // res.json(insertSet.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

// @route   POST /api/split/workout/exercise/track
// @desc    Update exercise with weight and reps
// @access  Private
router.post("/split/workout/exercise/track", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const date = new Date();
    const { set, exercise_id } = req.body;
    let { reps, weight } = req.body;

    if (!reps) reps = 0;
    if (!weight) weight = 0;

    const checkExerciseId = await pool.query(
      "SELECT * FROM exercises WHERE exercise_id = $1 AND user_id = $2",
      [exercise_id, user_id]
    );

    if (checkExerciseId.rows.length === 0) {
      return res.status(400).send("Unathorized");
    }

    const track = await pool.query(
      "INSERT INTO track (set, weight, reps, date, exercise_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [set, weight, reps, date, exercise_id, user_id]
    );
    res.json(track.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
