const handleLogin = (req, res, pool, bcrypt) => {
  const { email, password } = req.body;

  const user = pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((user) => {
      // if user exists
      if (user.rows.length === 0) {
        return res.json("Something is wrong with your credentials");
      }

      // is password is valid
      const isValid = bcrypt.compareSync(password, user.rows[0].password);
      if (!isValid) {
        return res.json("Something is wrong with your credentials");
      }

      const payload = { userId: user.rows[0].id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("access-token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const // return everything except the password
        userCredentials = {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
        };
      res.json(userCredentials);
    })
    .catch(() => res.status(500).send(err.message));
};

module.exports = {
  handleLogin: handleLogin,
};
