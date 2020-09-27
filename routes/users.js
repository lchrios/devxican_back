var express = require('express');
const { default: validator } = require('validator');
var router = express.Router();

const collection = "users";

/* GET users listing. */
router.get('/', function(req, res, next) {
  let db = req.app.get("db");
  let cursor = db.collection(collection).find({});

  let result = [];
  cursor.on("data", (d) => {
    result.push(d);
  });

  cursor.on("end", () => {
    res.send(result);
  });
});


/* POST an user */
router.post('/', (req, res, next) => {
  
  let user = {
    username: req.body.username,
    pass: req.body.pass,
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone
  };
  let db = req.app.get("db");
  
  if (validateUser(user)) {
    db.collection(collection).insertOne(JSON.parse(user), (err, resp) => {
      if (err) {
        res.status(201).send(user);
      } else {
        res.status(401).send(resp);
      }
    });
  }
});


function validateUser(user) {
  if (validator.isJSON(JSON.stringify(user)) == false) {
    return false;
  }

  if (user["username"] == undefined) {
    return false;
  }

  if (user["pass"] == undefined) {
    return false;
  }

  if (user["email"] == undefined) {
    return false;
  }

  if (user["name"] == undefined) {
    return false;
  }

  if (user["phone"] == undefined) {
    return false;
  }

  // extra validation


  return true;
}

module.exports = router;
