var express = require("express");
var router = express.Router();

/* GET home page. */
// GET home page.
router.get("/", function (req, res) {
  console.log("Redicrecting");
  res.redirect("/inventory");
});

module.exports = router;
