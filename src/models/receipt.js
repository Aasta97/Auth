const mongoose = require("../database");

const ReceiptSchema = new mongoose.Schema({
  code: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  },
  valueProduct: {
    type: String,
    require: true
  },
  qtd: {
    type: Number,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  client: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Receipt = mongoose.model("receipts", ReceiptSchema);

module.exports = Receipt;
