const Aid = require("../models/aid");
const async = require("async");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");
const Password = require("../models/password");

// Display list of all aid items.
exports.aid_list = async (req, res, next) => {
  try {
    const aid_data = await Aid.find({});
    res.redirect(aid_data[0].url);
  } catch (e) {
    next(e);
  }
};

// Display detail page for a specific aid item.
exports.aid_detail = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Aid.find().exec(callback);
      },
      selected: (callback) => {
        Aid.findById(req.params.id).exec(callback);
      },
    });
    res.render("aiddetail", {
      title: "Aid Detail",
      data: results.all,
      selected: results.selected,
      type: "aid",
      del: false,
    });
  } catch (e) {
    next(e);
  }
};

// Display aid item create form on GET.
exports.aid_create_get = (req, res) => {
  res.render("aidcreate", { title: "Add Aid" });
};

// Handle aid item create on POST.
exports.aid_create_post = [
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

  body("tag", "tag must be specified")
    .trim()
    .isLength({ min: 1, max: 4 })
    .escape(),

  body("effects", "effects must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Aid" });
    const aid = new Aid({
      name: req.body.name,
      val: req.body.val,
      weight: req.body.weight,
      effects: req.body.effects,

      tag: req.body.tag,
      category: cat,
    });
    if (!errors.isEmpty()) {
      res.render("aidcreate", { title: "Add Aid" });
    } else {
      try {
        await aid.save();
        res.redirect(aid.url);
      } catch (e) {
        next(e);
      }
    }
  },
];

// Display aid item delete form on GET.
exports.aid_delete_get = async (req, res, next) => {
  try {
    const results = await async.parallel({
      all: (callback) => {
        Aid.find().exec(callback);
      },
      selected: (callback) => {
        Aid.findById(req.params.id).exec(callback);
      },
    });
    res.render("aiddetail", {
      title: "Aid Detail",
      data: results.all,
      selected: results.selected,
      type: "aid",
      del: true,
    });
  } catch (e) {
    next(e);
  }
};

// Handle aid item delete on POST.
exports.aid_delete_post = async (req, res, next) => {
  try {
    if (
      await Password.exists({
        pwd: req.body.password,
      })
    ) {
      await Aid.findByIdAndRemove(req.params.id);
      res.redirect("/inventory/aid");
    } else {
      res.redirect(`/inventory/aid/${req.params.id}`);
    }
  } catch (e) {
    console.log("error");
    next(e);
  }
};

// Display aid item update form on GET.
exports.aid_update_get = async (req, res, next) => {
  try {
    const aid = await Aid.findById(req.params.id);
    res.render("aidcreate", {
      title: "Update Misc",
      dataItem: aid,
    });
  } catch (e) {
    next(e);
  }
};

// Handle aid item update on POST.
exports.aid_update_post = [
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

  body("tag", "tag must be specified")
    .trim()
    .isLength({ min: 1, max: 4 })
    .escape(),

  body("effects", "effects must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const cat = await category.findOne({ name: "Aid" });
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
      res.render("aidcreate", { title: "Add Aid" });
    } else {
      try {
        if (await Password.exists({ pwd: req.body.password })) {
          await Aid.findByIdAndUpdate(req.params.id, aid);
        }
        res.redirect(aid.url);
      } catch (e) {
        next(e);
      }
    }
  },
];
