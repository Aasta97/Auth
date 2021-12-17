const express = require("express");
const bcrypt = require("bcryptjs");
const Receipt = require("../models/receipt");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

router.get("/list", async (req, res) => {
    try {  
      const receipts = await Receipt.find();
      return res.send({ receipts });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao buscar Recibos" });
    }
  });

router.get("/:id", async (req, res) => {
  try {
      const id = req.params.id;
      const receipt = await Receipt.findOne({ _id: id });

      return res.send({ receipt });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao buscar Recibo" });
  }
});

router.get("/search/:code", async (req, res) => {
  try {
      const code = req.params.code;
      const receipt = await Receipt.find({ code });

      return res.send({ receipt });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao buscar Recibo" });
  }
});

router.put("/change/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { 
          name, 
          description, 
          value,
          qtd,
          date, 
          client,
          phone,
          address
        } = req.body;

        await Receipt.updateOne({ _id: id }, { 
          name, 
          description, 
          value,
          valueProduct: value / qtd, 
          qtd,
          date, 
          client,
          phone,
          address
        });  
        return res.send({ message: "Recibo alterado!" });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar Recibo" });
    }
  });

router.post("/create", async (req, res) => {
    try {
      const { 
          name, 
          description, 
          value,
          qtd,
          date, 
          client,
          phone,
          address
        } = req.body;  
      
      let code = await Receipt.findOne().sort({created_at: -1});
      if(code === null){ 
        code = 1; 
      }
      else{
        code = code.code + 1;
      }  

      const receipt = await Receipt.create({ 
        code,
        name, 
        description, 
        value,
        valueProduct: value / qtd, 
        qtd,
        date, 
        client,
        phone,
        address
      });
  
      return res.send({ receipt });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar Recibo" });
    }
  });

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Receipt.deleteOne({ _id: id });  
        return res.send({ message: "Recibo alterado!" });
    } catch (err) {
      return res.status(400).send({ error: "Falha ao salvar Recibo" });
    }
  });

module.exports = app => app.use("/receipts", router);
