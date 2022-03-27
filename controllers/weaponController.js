const Weapon = require("../models/weapon");
const async = require("async");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");
const Password = require("../models/password");

// Display list of all weapon items.
exports.weapon_list = async (req, res, next) => {
  try {
    const weapon_data = await Weapon.find({});
    res.redirect(weapon_data[0].url);
  } catch (e) {
    next(e);
  }
};

// Display detail page for a specific weapon item.
exports.weapon_detail = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Weapon.find().exec(callback);
      },
      selected: (callback) => {
        Weapon.findById(req.params.id).exec(callback);
      },
    });
    res.render("weapondetail", {
      title: "Weapon Detail",
      data: results.all,
      selected: results.selected,
      type: "weapon",
      del: false,
    });
  } catch (e) {
    next(e);
  }
};

// Display weapon item create form on GET.
exports.weapon_create_get = (req, res) => {
  res.render("weaponcreate", { title: "Add Weapon" });
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
    const cat = await category.findOne({ name: "Weapons" });
    const weapon = new Weapon({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      dam: req.body.damage,
      condition: req.body.condition, //genre is an array of genre ids
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.render("weaponcreate", { title: "Add Weapon" });
    } else {
      try {
        await weapon.save();
        res.redirect(weapon.url);
      } catch (e) {
        next(e);
      }
    }
  },
];

// Display weapon item delete form on GET.
exports.weapon_delete_get = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Weapon.find().exec(callback);
      },
      selected: (callback) => {
        Weapon.findById(req.params.id).exec(callback);
      },
    });
    res.render("weapondetail", {
      title: "Weapon Detail",
      data: results.all,
      selected: results.selected,
      type: "weapon",
      del: true,
    });
  } catch (e) {
    next(e);
  }
};

// Handle weapon item delete on POST.
exports.weapon_delete_post = async (req, res, next) => {
  try {
    if (
      await Password.exists({
        pwd: req.body.password,
      })
    ) {
      await Weapon.findByIdAndRemove(req.params.id);
      res.redirect("/inventory/weapons");
    } else {
      res.redirect(`/inventory/weapon/${req.params.id}`);
    }
  } catch (e) {
    console.log("error");
    next(e);
  }
};

// Display weapon item update form on GET.
exports.weapon_update_get = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const weapon = await Weapon.findById(req.params.id);
    res.render("weaponcreate", {
      title: "Update Weapon",
      dataItem: weapon,
    });
  } catch (e) {
    next(e);
  }
};

// Handle weapon item update on POST.
exports.weapon_update_post = [
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
    const cat = await category.findOne({ name: "Weapons" });
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
      res.render("weaponcreate", { title: "Add Weapon" });
    } else {
      try {
        if (
          await Password.exists({
            pwd: req.body.password,
          })
        ) {
          await Weapon.findByIdAndUpdate(req.params.id, weapon);
        }
        res.redirect(weapon.url);
      } catch (e) {
        next(e);
      }
    }
  },
];
