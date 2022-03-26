const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArmorSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  val: { type: Number, required: true },
  weight: { type: Number, required: true },
  condition: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  effects: { type: String },
});

ArmorSchema.virtual("url").get(function () {
  return "/inventory/armor/" + this._id;
});

ArmorSchema.virtual("get_id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Armor", ArmorSchema);
