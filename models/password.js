const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PasswordSchema = new Schema({
  pwd: { type: String },
});

module.exports = mongoose.model("Password", PasswordSchema, "adminPassword");
