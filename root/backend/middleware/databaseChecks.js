const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   ssl: true,
});

const checkSplitId = async (split_id, user_id) => {
  console.log(split_id, user_id);

  const splitId = await pool.query(
    "SELECT * FROM splits WHERE split_id = $1 AND user_id = $2",
    [split_id, user_id]
  );

  if (splitId.rows.length === 0) {
    return res.status(400).send("Unathorized");
  }
};

const checkWorkoutId = async (workout_id, split_id, user_id) => {
  const workoutId = await pool.query(
    "SELECT * FROM workouts WHERE workout_id = $1 AND split_id = $2 AND user_id = $3",
    [workout_id, split_id, user_id]
  );

  if (workoutId.rows.length === 0) {
    return res.status(400).send("Unathorized");
  }
};

module.exports = { checkSplitId, checkWorkoutId };
