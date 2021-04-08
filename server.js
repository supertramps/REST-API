const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Elin", eyeColor: "Blue", age: 19 },
  { id: 2, name: "Johan", eyeColor: "Hazel", age: 35 },
  { id: 3, name: "Alice", eyeColor: "Green", age: 23 },
  { id: 4, name: "Martin", eyeColor: "Blue", age: 44 },
  { id: 5, name: "Eva", eyeColor: "Green", age: 36 },
  { id: 6, name: "Simon", eyeColor: "Brown", age: 17 },
];

app.use(express.static("./client"));
app.use(express.json());

// GET all the users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET one of the users
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with the given ID was not found.");
  res.json(user);
});

// POST new user
app.post("/api/users", (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Name is required.");
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
    status: `New user ${nameToSave} created. `,
  });
});

// PUT (update) a user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }

  user.name = req.body.name;
  user.eyeColor = req.body.eyeColor;
  user.age = req.body.age;
  res.send(user);
});

// DELETE a user
app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));
