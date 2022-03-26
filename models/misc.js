const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MiscSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  val: { type: Number, required: true },
  weight: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

MiscSchema.virtual("url").get(function () {
  return "/inventory/misc/" + this._id;
});

MiscSchema.virtual("get_id").get(function () {
  return this._id.toString();
});
module.exports = mongoose.model("Misc", MiscSchema);
