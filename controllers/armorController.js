const Armor = require("../models/armor");
const async = require("async");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");
const Password = require("../models/password");

// Display list of all Armor.
exports.armor_list = async (req, res, next) => {
  try {
    const armor_data = await Armor.find({});
    res.redirect(armor_data[0].url);
  } catch (e) {
    next(e);
  }
};

// Display detail page for a specific Armor.
exports.armor_detail = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Armor.find().exec(callback);
      },
      selected: (callback) => {
        Armor.findById(req.params.id).exec(callback);
      },
    });

    res.render("armordetail", {
      title: "Armor Detail",
      data: results.all,
      selected: results.selected,
      type: "armor",
      del: false,
    });
  } catch (e) {
    next(e);
  }
};

// Display Armor create form on GET.
exports.armor_create_get = (req, res) => {
  res.render("armorcreate", { title: "Add Armor" });
};

// Handle Armor create on POST.
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

  body("effects", "effects must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Armor" });
    const armor = new Armor({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      effects: req.body.effects, //genre is an array of genre ids
      condition: req.body.condition,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.render("armorcreate", { title: "Add Armor" });
    } else {
      try {
        await armor.save();
        res.redirect(armor.url);
      } catch (e) {
        next(e);
      }
    }
  },
];

// Display Armor delete form on GET.
exports.armor_delete_get = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Armor.find().exec(callback);
      },
      selected: (callback) => {
        Armor.findById(req.params.id).exec(callback);
      },
    });

    res.render("armordetail", {
      title: "Armor Detail",
      data: results.all,
      selected: results.selected,
      type: "armor",
      del: true,
    });
  } catch (e) {
    next(e);
  }
};

// Handle Armor delete on POST.
exports.armor_delete_post = async (req, res, next) => {
  try {
    if (
      await Password.exists({
        pwd: req.body.password,
      })
    ) {
      await Armor.findByIdAndRemove(req.params.id);
      res.redirect("/inventory/armor");
    } else {
      res.redirect(`/inventory/armor/${req.params.id}`);
    }
  } catch (e) {
    console.log("error");
    next(e);
  }
};

// Display Armor update form on GET.
exports.armor_update_get = async (req, res, next) => {
  try {
    const armor = await Armor.findById(req.params.id);
    res.render("armorcreate", {
      title: "Update Misc",
      dataItem: armor,
    });
  } catch (e) {
    next(e);
  }
};

// Handle Armor update on POST.
exports.armor_update_post = [
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

  body("effects", "effects must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Armor" });
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
      res.render("armorcreate", { title: "Add Armor" });
    } else {
      try {
        await Armor.findByIdAndUpdate(req.params.id, armor);
        res.redirect(armor.url);
      } catch (e) {
        next(e);
      }
    }
  },
];
