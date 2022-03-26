const Category = require("../models/category");

// get the homepage and show all categories

exports.homepage = (req, res) => {
  res.redirect("/inventory/weapons");
};

// Display list of all category items.
exports.category_list = async (req, res, next) => {
  try {
    const result = await Category.find().sort([["name", "descending"]]);
    res.send(result);
  } catch (e) {
    next(e);
  }
};

// Display detail page for a specific category item.
exports.category_detail = async (req, res, next) => {
  try {
    const result = await Category.findById(req.params.id);
    res.send(result);
  } catch (e) {
    next(e);
  }
};
