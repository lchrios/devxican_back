var express = require("express");
var router = express.Router();

const collection = "questions";

router.get("/", (req, res, next) => {
  let db = req.app.get("db");
  var cursor = db.collection(collection).find({});

  var result = [];
  cursor.on("data", (d) => {
    result.push(d);
  });

  cursor.on("end", () => {
    res.send(result);
  });
});

module.exports = router;
