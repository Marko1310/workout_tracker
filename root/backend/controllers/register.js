const handleRegister = function (req, res, pool) {
  const { name, email, password } = req.body;
  pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
    name,
    email,
    password,
  ]);
};

module.exports = {
  handleRegister: handleRegister,
};
