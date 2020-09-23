var express = require("express");
const { ObjectID } = require("mongodb");
let validator = require("validator");

var router = express.Router();

const collection = "questions";

// GET all collection
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

// GET a specific questio with ID
router.get("/:id", (req, res, next) => {
  let db = req.app.get("db");

  let id = req.params.id;

  var cursor = db.collection(collection).find({
    _id: ObjectID(id),
  });

  var result = [];
  cursor.on("data", (d) => {
    result.push(d);
  });

  cursor.on("end", () => {
    if (result.length == 0) {
      res.status(404).send(`Error: No question found with ID  ${id}`);
    } else {
      res.send(result);
    }
  });
});

// POST a question
router.post("/", (req, res, next) => {
  let question = req.body;

  if (validateQuestion(question) == true) {
    let db = req.app.get("db");

    /*
        here we could add the user that is logged to the question
        question.user = {
            name: req.session.name,
            email: req.session.email
        };
    */

    db.collection(collection).insertOne(question, (err, resp) => {
      if (!err) {
        res.status(201).send(resp);
      } else {
        res.status(510).send("Error: trying to insert into DB");
      }
    });
  } else {
    res.status(403).send("Error: with the request, data was not added");
  }
});

/*
JSON Expected
{
  "title" : "¿Oracle pregunta sobre SQL?",
  "date" : 2020-09-15T17:47:59+00:00,
  "author" : null,
  "description": "Tengo entrevista en oracle en 15 dias y estoy aplicando para ios developer, pero no sé si deberia estudiar las bases de datos de Oracle ya que supongo que son una parte importante de la empresa",
  "answers" : [],
  "likes" : 0,
  "dislikes" : 0,
}
*/
function validateQuestion(question) {
  if (validator.isJSON(JSON.stringify(question)) == false) {
    return false;
  }

  if (question["title"] == undefined) {
    return false;
  }
  if (question["date"] == undefined) {
    return false;
  }
  if (question["author"] != null) {
    return false;
  }
  if (question["description"] == undefined) {
    return false;
  }
  if (question["answers"] == undefined) {
    return false;
  }
  if (question["likes"] == undefined) {
    return false;
  }
  if (question["dislikes"] == undefined) {
    return false;
  }
  // needs more validations

  return true;
}

module.exports = router;
