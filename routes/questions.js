let express = require("express");
const { ObjectID } = require("mongodb");
let validator = require("validator");

let router = express.Router();

const collection = "questions";

// UPDATE all document
router.put("/:id", (req, res, next) => {
  let db = req.app.get("db");
  let id = ObjectID(req.params.id);
  //let cursor = db.collection(collection).replaceOne({_id: id})
});

// GET all collection
router.get("/", (req, res, next) => {
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

// GET a specific questio with ID
router.get("/:id", (req, res, next) => {
  let db = req.app.get("db");
  let id = req.params.id;

  let cursor = db.collection(collection).find({
    _id: ObjectID(id),
  });

  let result = [];
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

// Like a post
router.put("/:id/like", (req, res) => {
  let db = req.app.get("db");
  let id = ObjectID(req.params.id);

  let cursor = db.collection("questions").updateOne({_id: id}, {$inc: { likes: 1} }, (err, resp) => {
    if (err) {
      res.status(404).send("Error: couldn't like the post.")
    } else {
      res.status(204).send(resp);
    }
  });
});

// Dislike a post
router.put("/:id/dislike", (req, res) => {
  let db = req.app.get("db");
  let id = ObjectID(req.params.id);

  let cursor = db.collection("questions").updateOne({_id: id
  }, {$inc: { dislikes: 1} }, (err, resp) => {
    if (err) {
      res.status(404).send("Error: couldn't like the post.")
    } else {
      res.status(204).send(resp);
    }
  });
});

// Delete question by ID
router.delete("/:id", (req, res) => {
  let db = req.app.get("db");
  let id = req.params.id;

  let query = {_id: ObjectID(id) };
  console.log(query);

  let cursor = db.collection(collection).deleteOne(query, (err, question) => {
    if (err) {
      res.status(404).send("Error: no question was removed.")
    } else {
      res.status(204).send(question);
    }
  });
});

// GET a specific question with ID
router.get("/:id", (req, res, next) => {
  let db = req.app.get("db");
  let id = req.params.id;

  let cursor = db.collection(collection).find({
    _id: ObjectID(id),
  });

  let result = [];
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
})

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
    res.status(400).send("Error: with the request, data was not added");
  }
});


// GET all comments from a question
router.get("/:id/comments", (req, res, next) => {
  let db = req.app.get("db");
  let id = req.params.id;

  let cursor = db.collection(collection).find({_id: ObjectID(id)});

  let result = [];
  cursor.on("data", (d) => {
    for (var i = 0; i < d.answers.length; i++) {
      if (d != null){
        result.push(d.answers[i]); 
      }
    }
  });

  cursor.on("end", () => {
    if (result.length == 0) {
      res.status(404).send(`Error: No comments found for question with ID  ${id}`);
    } else {
      result.splice(0,1);
      res.send(result);
    }
  });
});

// GET a comment by id from a question
router.get("/:id/comments/:cid", (req, res, next) => {
  let db = req.app.get("db");
  let id = req.params.id;
  let cid = req.params.cid;

  let cursor = db.collection(collection).find({_id: ObjectID(id)});

  let result = [];
  cursor.on("data", (d) => {
    for (var i = 0; i < d.answers.length; i++) {
      if (d != null){
        result.push(d.answers[i]); 
      }
    }
  });

  cursor.on("end", () => {
    if (result.length == 0) {
      res.status(404).send(`Error: No comments found for question with ID  ${id}`);
    } else {
      result.splice(0,1);
      res.send(result[cid]);
    }
  });
});

// Delete coment by ID
router.delete("/:id/comments/:cid", (req, res) => {
  let db = req.app.get("db");
  let id = req.params.id;
  let cid = req.params.cid;

  let query = {_id: ObjectID(id) };

  let cursor = db.collection(collection).findOne(query, (err, question) => {
    if (err) {
      res.status(404).send("Error: no question was found.")
    } else {
      // delete from array
      question.answers.splice(cid, 1);
      // update array
      db.collection(collection).updateOne(query, {$set: {answers: question.answers}}, (err, resp) =>{
        if (err) {
          res.status(404).send("Error: no such comment was found.");
        } else {
          res.status(204).send(resp);
        }
      });
    }
  });
});


// POST a comment
router.post("/:id/comments", (req, res, next) => {
  let comment = req.body;
  let id = req.params.id;
  let db = req.app.get("db");

  // validate comment
  if (validateComment(comment) == false) {
    res.status(400).send("Error: with the request, data was not added");
  }

  // validate id
  let result = [];
  let cursor = db.collection(collection).find({
    _id: ObjectID(id),
  });

  cursor.on("data", (d) => {
    result.push(d);
  });

  cursor.on("end", () => {
    if (result.length == 0) {
      res.status(400).send("ERROR: there is no question with the id provided");
    } else {
      let query = result[0];
      let answersArray = query["answers"];
      answersArray.push(comment);

      const updateDoc = {
        $set: {
          answers: answersArray,
        },
      };
      console.log(query);
      console.log(query["_id"]);
      const filter = {
        _id: ObjectID(id),
      };

      db.collection(collection).updateOne(filter, updateDoc, (err, resp) => {
        if (!err) {
          res.status(201).send(resp);
        } else {
          res.status(510).send("ERROR: trying to update record DB");
        }
      });
    }
  });
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

function validateComment(comment) {
  if (validator.isJSON(JSON.stringify(comment)) == false) {
    return false;
  }

  if (comment["author"] == undefined) {
    console.log("author not found");
    return false;
  }

  if (comment["date"] == undefined) {
    console.log("date not found");
    return false;
  }

  if (comment["comment"] == undefined) {
    console.log("comment not found");
    return false;
  }

  if (comment["likes"] == undefined) {
    console.log("likes not found");
    return false;
  }

  if (comment["dislikes"] == undefined) {
    console.log("dislikes not found");
    return false;
  }

  // needs more validations

  return true;
}

function validateQuestion(question) {
  if (validator.isJSON(JSON.stringify(question)) == false) {
    return false;
  }

  if (question["title"] == undefined) {
    console.log("title not found");
    return false;
  }
  if (question["date"] == undefined) {
    console.log("date not found");
    return false;
  }
  if (question["author"] == undefined) {
    console.log("author not found");
    return false;
  }
  if (question["description"] == undefined) {
    console.log("description not found");
    return false;
  }
  if (question["answers"] == undefined) {
    
    console.log("answers not found");
    return false;
  }
  if (question["likes"] == undefined) {
    console.log("likes not found");
    return false;
  }
  if (question["dislikes"] == undefined) {
    console.log("dislikes not found");
    return false;
  }
  // needs more validations

  return true;
}

module.exports = router;
