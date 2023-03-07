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

//      RETRIEVING DATA     //
///////////////////////////////
// @route   GET /api/splits/current
// @desc    get user splits with list of workouts
// @access  Private
router.get("/splits/current", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;

    const splits = await pool.query(
      "SELECT s.split_id, s.split_name, s.days, s.date, array_agg(w.workout_name) FROM splits s LEFT JOIN workouts w ON w.split_id = s.split_id WHERE s.user_id = $1 GROUP BY s.split_id",
      [user_id]
    );

    res.json(splits.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workouts/:splitId
// @desc    get user workouts with list of exercises from the split
// @access  Private
router.get("/splits/workouts/:splitId", requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;

    // Get user workouts
    const workouts = await pool.query(
      "SELECT w.workout_id, w.workout_name, w.date, array_agg(e.exercise_name) FROM workouts w LEFT JOIN exercises e ON e.workout_id = w.workout_id WHERE w.user_id = $1 AND w.split_id = $2 GROUP BY w.workout_id",
      [user_id, split_id]
      // "SELECT * FROM workouts WHERE user_id=$1 AND split_id = $2 ORDER BY date DESC",
    );
    res.json(workouts.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workouts/workout/current
// @desc    get user workout
// @access  Private
router.get(
  "/splits/workouts/workout/current",
  requiresAuth,
  async (req, res) => {
    try {
      user_id = req.user.id;
      const { workout_id } = req.body;

      // Get user exercises from the workout
      const exercises = await pool.query(
        "SELECT * FROM exercises WHERE user_id=$1 AND workout_id = $2 ORDER BY date DESC",
        [user_id, workout_id]
      );
      //   console.log(exercises.rows);

      // Get track data from each exercise from the workout
      // 1. get all the id's of the exercises from the given workout
      //   const exercise_id = await pool.query(
      //     "SELECT exercise_id FROM exercises WHERE workout_id=$1 ORDER BY date DESC",
      //     [workout_id]
      //   );
      //   console.log(exercise_id.rows);

      //   const track = await pool.query(
      //     "SELECT * FROM track WHERE user_id=$1 AND exercise_id = $2 ORDER BY date DESC",
      //     [user_id, exercise_id]
      //   );

      //   const track = await pool.query(
      //     "SELECT * FROM track WHERE user_id=$1 ORDER BY date DESC",
      //     [user_id]
      //   );

      const track_data = await pool.query(
        "SELECT w.workout_name, e.exercise_name, t.set, t.weight FROM workouts w INNER JOIN exercises e ON e.workout_id = w.workout_id INNER JOIN track t ON t.exercise_id = e.exercise_id WHERE w.workout_id = $1;",
        [9]
      );

      //   const track_data = await pool.query(
      //     "SELECT w.workout_name, e.exercise_name FROM workouts w INNER JOIN exercises e ON e.workout_id = w.workout_id WHERE w.workout_id = $1;",
      //     [9]
      //   );

      console.log(track_data.rows);
      res.json(track_data.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

module.exports = router;
