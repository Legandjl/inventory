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

// Handle weapon item create on POST.
exports.misc_create_post = [
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),
  body("val", "val must be specified and in the range 1 - 9999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 9999 })
    .escape(),
  body("weight", "weight must be specified and in the range 1 - 999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 999 })
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    const cat = await Category.findOne({ name: "Misc" });
    const misc = new Misc({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      try {
        await misc.save();
        res.send({ data: misc, message: "Misc created" });
      } catch (e) {
        res.json({ error: e });
      }
    }
  },
];
