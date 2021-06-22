var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("<div><h1>full stack</h1></div><div><h1>back end</h1></div>");
});

module.exports = router;
