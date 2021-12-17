const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  code: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  status: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
