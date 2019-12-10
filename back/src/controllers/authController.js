const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");
const User = mongoose.model("User");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({ message: "Usuário não encontrado." });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ message: "Senha inválida!" });

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
  },

  async createUser(req, res) {
    try {
      const { email } = req.body;
      if (await User.findOne({ email }))
        return res.status(400).send({ message: "Email já cadastrado." });
      const user = await User.create(req.body);
      user.password = undefined;

      return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      return res.status(400).send({ message: "Falha na criação do registro." });
    }
  },

  async getUsers(req, res) {
    const users = await User.find();

    return res.json(users);
  }
};
