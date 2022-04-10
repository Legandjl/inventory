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
