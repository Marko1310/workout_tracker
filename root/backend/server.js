require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));

// import routes
const authRoute = require("./routes/Auth");
const addWorkoutRoute = require("./routes/AddWorkouts");
const retrieveWorkoutRoute = require("./routes/RetrieveWorkouts");
const editWorkoutRoute = require("./routes/EditWorkouts");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRoute);
app.use("/api/auth", addWorkoutRoute);
app.use("/api/auth", retrieveWorkoutRoute);
app.use("/api/auth", editWorkoutRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
