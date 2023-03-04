const handleLogin = (req, res, pool, bcrypt) => {
  const { email, password } = req.body;

  const user = pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((user) => {
      userCredentials = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      };
      res.json(userCredentials);
    });

  // pool
  //   .query("SELECT * FROM users WHERE email = $1", [email])
  //   .then((data) => {
  //     const isValid = bcrypt.compareSync(password, data.rows[0].password);
  //     if (isValid) {
  //       pool
  //         .query("SELECT * FROM users WHERE email = $1", [email])
  //         .then((user) => res.json(user.rows[0]));
  //     } else {
  //       res.status(400).json("Something is wrong with your credentials");
  //     }
  //   })
  //   .catch(() =>
  //     res.status(400).json("Something is wrong with your credentials")
  //   );
};

module.exports = {
  handleLogin: handleLogin,
};
