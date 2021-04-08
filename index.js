const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Elin", eyeColor: "Blue", age: 19 },
  { id: 2, name: "Johan", eyeColor: "Hazel", age: 35 },
  { id: 3, name: "Alice", eyeColor: "Green", age: 23 },
  { id: 4, name: "Martin", eyeColor: "Blue", age: 44 },
  { id: 5, name: "Eva", eyeColor: "Green", age: 36 },
  { id: 6, name: "Simon", eyeColor: "Brown", age: 17 },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// GET all the users
app.get("/api/users", (req, res) => {
  res.send(users);
});

// GET one of the users
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

// POST new user
app.post("/api/users", (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Name is required.");
    return;
  }
  const user = {
    id: users.length + 1,
    name: req.body.name,
    eyeColor: req.body.eyeColor,
    age: req.body.age,
  };
  users.push(user);
  res.send(user);
});

// PUT (update) an user
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

// DELETE an user
app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));
