const Misc = require("../models/misc");
const async = require("async");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");

// Display list of all misc items.
exports.misc_list = async (req, res, next) => {
  try {
    const misc_data = await Misc.find({});
    res.redirect(misc_data[0].url);
  } catch (e) {
    next(e);
  }
};

// Display detail page for a specific misc item.
exports.misc_detail = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Misc.find().exec(callback);
      },
      selected: (callback) => {
        Misc.findById(req.params.id).exec(callback);
      },
    });
    res.render("miscdetail", {
      title: "Misc Detail",
      data: results.all,
      selected: results.selected,
      type: "misc",
      del: false,
    });
  } catch (e) {
    next(e);
  }
};

// Display misc item create form on GET.
exports.misc_create_get = (req, res) => {
  res.render("misccreate", { title: "Add Misc" });
};

// Handle misc item create on POST.
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

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Misc" });
    const misc = new Misc({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.render("misccreate", { title: "Add Misc" });
    } else {
      try {
        await misc.save();
        res.redirect(misc.url);
      } catch (e) {
        next(e);
      }
    }
  },
];

// Display misc item delete form on GET.
exports.misc_delete_get = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Misc.find().exec(callback);
      },
      selected: (callback) => {
        Misc.findById(req.params.id).exec(callback);
      },
    });
    res.render("miscdetail", {
      title: "Misc Detail",
      data: results.all,
      selected: results.selected,
      type: "misc",
      del: true,
    });
  } catch (e) {
    next(e);
  }
};

// Handle misc item delete on POST.
exports.misc_delete_post = async (req, res, next) => {
  try {
    await Misc.findByIdAndRemove(req.params.id);
  } catch (e) {
    next(e);
  }
  res.redirect("/inventory/misc");
};

// Display misc item update form on GET.
exports.misc_update_get = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const misc = await Misc.findById(req.params.id);
    res.render("misccreate", {
      title: "Update Misc",
      dataItem: misc,
    });
    console.log(misc);
  } catch (e) {
    next(e);
  }
};

// Handle misc item update on POST.
exports.misc_update_post = [
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

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Misc" });
    const misc = new Misc({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      category: cat,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("misccreate", { title: "Add Misc" });
    } else {
      try {
        await Misc.findByIdAndUpdate(req.params.id, misc);
        res.redirect(misc.url);
      } catch (e) {
        next(e);
      }
    }
  },
];
