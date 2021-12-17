const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

router.get("/list", async (req, res) => {
    try {  
      const users = await User.find();
      return res.send({ users });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao buscar usuários" });
    }
  });

router.get("/search/:name", async (req, res) => {
  try {
      const name = req.params.name;
      const users = await User.find({ name: { $regex: '.*' + name + '.*' } })
      
      return res.send({ users });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao buscar usuário" });
  }
});

router.get("/:id", async (req, res) => {
  try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });

      return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao buscar usuário" });
  }
});

router.put("/change/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, username, password, status } = req.body;
        await User.updateOne({ _id: id }, { name, username, password, status });  
        return res.send({ message: "Usuário alterado!" });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar usuário" });
    }
  });

router.post("/create", async (req, res) => {
    try {
      const { name, username, password, status } = req.body;
      if (await User.findOne({ username }))
        return res.status(400).send({ error: "usuário já existe" });
      
      let code = await User.findOne().sort({created_at: -1});
      if(code === null){ 
        code = 1; 
      }
      else{
        code = code.code + 1;
      }
      
      const user = await User.create({ code, name, username, password, status });
  
      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar usuário" });
    }
  });

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });  
        return res.send({ message: "Usuário alterado!" });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar usuário" });
    }
  });

module.exports = app => app.use("/users", router);
