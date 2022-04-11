const async = require("async");
const Armor = require("../models/armor");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.armor = async (req, res, next) => {
  try {
    const armor_data = await Armor.find({});
    res.send(armor_data);
  } catch (e) {
    next(e);
  }
};

exports.armor_detail = async (req, res, next) => {
  try {
    const armor = await Armor.findById(req.params.id);
    if (armor) {
      res.send(armor);
    } else {
      return res.status(404).json({ error: "Weapon not found" });
    }
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

// Handle weapon item create on POST.
exports.armor_create_post = [
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
    const cat = await Category.findOne({ name: "Armor" });
    const armor = new Armor({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      condition: req.body.condition, //genre is an array of genre ids
      effects: req.body.effects,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      try {
        await armor.save();
        res.send({ armor: armor, message: "Armor created" });
      } catch (e) {
        res.send(e);
      }
    }
  },
];

exports.armor_delete_post = async (req, res, next) => {
  try {
    await Armor.findByIdAndRemove(req.params.id);
    return res.status(200).json();
  } catch (e) {
    console.log("error");
    return res.status(400).json({ error: "Armor could not be removed" });
  }
};

// Handle weapon item create on POST.
exports.armor_create_post = [
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
    const cat = await Category.findOne({ name: "Armor" });
    const armor = new Armor({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      effects: req.body.effects, //genre is an array of genre ids
      condition: req.body.condition,
      category: cat,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      try {
        await armor.save();
        res.send({ data: armor, message: "Armor created" });
      } catch (e) {
        res.json({ error: e });
      }
    }
  },
];
