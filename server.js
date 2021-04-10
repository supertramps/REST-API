const express = require("express");
const Joi = require("@hapi/joi");
var jsonfile = require("jsonfile");
const app = express();
const fs = require("fs");
let rawdata = fs.readFileSync("users.json");
let users = JSON.parse(rawdata);

app.use(express.static("./client"));
app.use(express.json());

// GET all the users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET one of the users
app.get("/api/users/:id", (req, res) => {
  const user = getUser(req.params.id);
  if (user.length === 0) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }
  res.json(user);
  // res.json(getUser(req.params.id));
});

// POST new user
app.post("/api/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    eyeColor: Joi.string().required(),
    age: Joi.number().required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const nameToSave = req.body.name;
  const eyeColorToSave = req.body.eyeColor;
  const ageToSave = req.body.age;

  let idToSave = 0;
  users.forEach((user) => {
    if (user.id > idToSave) {
      idToSave = user.id;
    }
  });
  idToSave++;

  users.push({
    id: idToSave,
    name: nameToSave,
    eyeColor: eyeColorToSave,
    age: ageToSave,
  });
  res.json({
    status: `New user ${nameToSave} created.`,
  });
});

// PUT (update) a user
app.put("/api/users/:id", (req, res) => {
  const user = getUser(req.params.id);
  if (user.length === 0) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }

  jsonfile.readFile("users.json", function (err, obj) {
    const fileObj = obj;
    if (req.body.name) {
      fileObj[req.params.id - 1].name = req.body.name;
    }
    if (req.body.eyeColor) {
      fileObj[req.params.id - 1].eyeColor = req.body.eyeColor;
    }
    if (req.body.age) {
      fileObj[req.params.id - 1].age = req.body.age;
    }
    jsonfile.writeFile("users.json", fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
      res.send(fileObj[req.params.id - 1]);
    });
  });
});

// DELETE a user
app.delete("/api/users/:id", (req, res) => {
  const user = getUser(req.params.id);
  if (user.length === 0) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json(user);
});

function getUser(id) {
  return users.filter(function (users) {
    return users.id == id;
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));
