const async = require("async");
const Misc = require("../models/misc");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.misc = async (req, res, next) => {
  try {
    const misc_data = await Misc.find({});
    res.send(misc_data);
  } catch (e) {
    next(e);
  }
};

exports.misc_detail = async (req, res, next) => {
  try {
    const misc = await Misc.findById(req.params.id);
    if (misc) {
      res.send(misc);
    } else {
      return res.status(404).json({ error: "Misc not found" });
    }
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

exports.misc_delete_post = async (req, res, next) => {
  try {
    await Misc.findByIdAndRemove(req.params.id);
    return res.status(200).json();
  } catch (e) {
    console.log("error");
    return res.status(400).json({ error: "Misc could not be removed" });
  }
};
