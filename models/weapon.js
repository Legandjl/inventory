const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  val: { type: Number, required: true },
  weight: { type: Number, required: true },
  dam: { type: Number, required: true },
  condition: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

WeaponSchema.virtual("url").get(function () {
  return "/inventory/weapon/" + this._id;
});
WeaponSchema.virtual("get_id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Weapon", WeaponSchema);
