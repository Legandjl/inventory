const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AidSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  val: { type: Number, required: true },
  weight: { type: Number, required: true },
  effects: { type: String, required: true },
  tag: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

AidSchema.virtual("url").get(function () {
  return "/inventory/aid/" + this._id;
});

module.exports = mongoose.model("Aid", AidSchema);
