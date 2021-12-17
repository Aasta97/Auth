const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const authConfig = require("../configs/auth");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Senha inválida" });
  user.password = undefined;

  const token = generateToken({ id: user.id });

  res.send({ user, token });
});

module.exports = app => app.use("/auth", router);
