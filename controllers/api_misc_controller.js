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
