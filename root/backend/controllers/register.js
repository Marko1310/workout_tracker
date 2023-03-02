const handleRegister = function (req, res, pool, bcrypt) {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (name === "") {
    return res.status(400).json("name field can not be empty");
  } else if (email === "" || !emailRegex.test(email)) {
    return res.status(400).json("not a proper email");
  } else if (password.length < 6) {
    return res
      .status(400)
      .json("password has to be at least 6 characters long");
  } else if (name && email && password) {
    pool
      .query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
        name,
        email,
        hash,
      ])
      .then((user) => {
        res.json(user.rows[0]);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = {
  handleRegister: handleRegister,
};
