const async = require("async");
const Aid = require("../models/aid");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.aid = async (req, res, next) => {
  try {
    const aid_data = await Aid.find({});
    res.send(aid_data);
  } catch (e) {
    next(e);
  }
};

exports.aid_detail = async (req, res, next) => {
  try {
    const aid = await Aid.findById(req.params.id);
    if (aid) {
      res.send(aid);
    } else {
      return res.status(404).json({ error: "Misc not found" });
    }
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

exports.aid_delete_post = async (req, res, next) => {
  try {
    await Aid.findByIdAndRemove(req.params.id);
    return res.status(200).json();
  } catch (e) {
    console.log("error");
    return res.status(400).json({ error: "Aid could not be removed" });
  }
};

// Handle weapon item create on POST.
exports.aid_create_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("val", "Val must be specified and in the range 1 - 9999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 9999 })
    .escape(),
  body("weight", "Weight must be specified and in the range 1 - 999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 999 })
    .escape(),

  body("tag", "Tag must be specified")
    .trim()
    .isLength({ min: 1, max: 4 })
    .escape(),

  body("effects", "Effects must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    const cat = await Category.findOne({ name: "Aid" });
    const aid = new Aid({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      effects: req.body.effects,
      tag: req.body.tag,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array({ onlyFirstError: true }));
    } else {
      try {
        await aid.save();
        res.send({ data: aid, message: "Aid created" });
      } catch (e) {
        res.json({ error: e });
      }
    }
  },
];

exports.aid_update_put = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("val", "Val must be specified and in the range 1 - 9999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 9999 })
    .escape(),
  body("weight", "Weight must be specified and in the range 1 - 999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 999 })
    .escape(),

  body("tag", "Tag must be specified")
    .trim()
    .isLength({ min: 1, max: 4 })
    .escape(),

  body("effects", "Effects must be specified and less than 30 chars")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    const cat = await Category.findOne({ name: "Aid" });
    const aid = new Aid({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      effects: req.body.effects,
      tag: req.body.tag,
      category: cat,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array({ onlyFirstError: true }));
    } else {
      try {
        await Aid.findByIdAndUpdate(req.params.id, aid);
        return res.status(200).json({ id: req.params.id });
      } catch (e) {
        res.send({ errors: e, message: "Something went wrong" });
      }
    }
  },
];
