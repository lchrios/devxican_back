var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/db", (req, res, next) => {
  let db = req.app.get("db");
  console.log(db);
  res.send("Request recived");
});

module.exports = router;
