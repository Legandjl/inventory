const async = require("async");
const Weapon = require("../models/weapon");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.weapons = async (req, res, next) => {
  try {
    const weapon_data = await Weapon.find({});
    res.send(weapon_data);
  } catch (e) {
    next(e);
  }
};

exports.weapon_detail = async (req, res, next) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    if (weapon) {
      res.send(weapon);
    } else {
      return res.status(404).json({ error: "Weapon not found" });
    }
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

// Handle weapon item create on POST.
exports.weapon_create_post = [
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
  body("condition", "condition must be specified and in the range 1 - 99")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 99 })
    .escape(),

  body("damage", "damage must be specified and in the range 1 - 999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 99 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await Category.findOne({ name: "Weapons" });
    const weapon = new Weapon({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      dam: req.body.damage,
      condition: req.body.condition, //genre is an array of genre ids
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      try {
        await weapon.save();
        res.send({ weapon: weapon, message: "Weapon created" });
      } catch (e) {
        res.send(e);
      }
    }
  },
];

// Handle weapon item update on POST.
exports.weapon_update_put = [
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
  body("condition", "condition must be specified and in the range 1 - 99")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 99 })
    .escape(),

  body("damage", "damage must be specified and in the range 1 - 999")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 1, max: 99 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await Category.findOne({ name: "Weapons" });
    const weapon = new Weapon({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      dam: req.body.damage,
      condition: req.body.condition, //genre is an array of genre ids
      category: cat,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      try {
        await Weapon.findByIdAndUpdate(req.params.id, weapon);
        return res.status(200).json({ id: req.params.id });
      } catch (e) {
        next(e);
      }
    }
  },
];

// Handle weapon item delete on POST.
exports.weapon_delete_post = async (req, res, next) => {
  try {
    await Weapon.findByIdAndRemove(req.params.id);
    return res.status(200).json();
  } catch (e) {
    console.log("error");
    return res.status(400).json({ error: "User could not be removed" });
  }
};
