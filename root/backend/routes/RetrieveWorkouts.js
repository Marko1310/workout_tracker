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
      "SELECT s.split_id, s.split_name, s.days, s.date, array_agg(w.workout_name) FROM splits s LEFT JOIN workouts w ON w.split_id = s.split_id WHERE s.user_id = $1 GROUP BY s.split_id ORDER BY s.date",
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

// @route   GET /api/splits/workouts/workout/:workoutId
// @desc    get user workout
// @access  Private
router.get(
  "/splits/workouts/workout/:workoutId",
  requiresAuth,
  async (req, res) => {
    try {
      user_id = req.user.id;
      const workout_id = req.params.workoutId;
      console.log(workout_id);

      // Get user exercises with tracking data from a given workout
      // importing track data into object to attach to every exercise
      const track_data = await pool.query(
        "SELECT e.exercise_id, e.exercise_name, e.goal_sets, e.goal_reps, json_agg(json_build_object('id', track_id, 'sets', t.set, 'reps', t.reps, 'weight', t.weight) ORDER BY t.set) AS sets_reps_weight FROM exercises e LEFT JOIN track t ON e.exercise_id = t.exercise_id WHERE e.workout_id = $1 GROUP BY e.exercise_id, e.exercise_name ORDER BY e.exercise_id;",
        [workout_id]
      );

      res.json(track_data.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

module.exports = router;
