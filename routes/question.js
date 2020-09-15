var express = require("express");
let validator = require("validator");

var router = express.Router();

const collection = "questions";

router.post("/", (req, res, next) => {
  let question = req.body.question;

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
        res.status(500).send("Error: trying to inser into DB");
      }
    });
  } else {
    res.status(403).send("Error: with the request, data was not added");
  }
});

/*
JSON Expected
{
  "title" : "¿Oracle pregunta sobre SQL?"
  "date" : 2020-09-15T17:47:59+00:00
  "author" : null,
  "description": "Tengo entrevista en oracle en 15 dias y estoy aplicando para ios developer, pero no sé si deberia estudiar las bases de datos de Oracle ya que supongo que son una parte importante de la empresa",
  "answers" : [],
  "likes" : 0,
  "dislikes" : 0,
}
*/
function validateQuestion(question) {
  if (validator.isJSON(JSON.parse(question)) == false) {
    return false;
  }
  if (question["title"] == undefined) {
    return false;
  }
  if (question["date"] == undefined) {
    return false;
  }
  if (question["author"] == undefined) {
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

  // need more validations
}

module.exports = router;
