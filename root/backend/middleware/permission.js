const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies["access-token"];
  let isAuth = false;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = pool
      .query("SELECT * FROM users WHERE id = $1", [userId])
      .then((user) => {
        // if user exists
        if (user.rows.length === 0) {
          const userCredentials = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
          };
          req.user = userCredentials;
          isAuth = true;
        }
        isAuth = false;
      });
  }
  isAuth = false;

  if (isAuth) {
    return next();
  } else {
    return res.status(401).send("Unathorized");
  }
};

module.exports = requireAuth;
