window.addEventListener("load", initSite);

async function initSite() {
  getAllUsers();
}

// Get all users
async function getAllUsers() {
  const users = await makeRequest("/api/users", "GET");

  for (let i = 0; i < users.length; i++) {
    const userCard = document.createElement("div");
    const editButton = document.createElement("button");
    // editButton.onclick();
    const name = document.createElement("p");
    const age = document.createElement("p");
    const eyeColor = document.createElement("p");
    const id = document.createElement("p");
    editButton.classList.add("editButton");
    userCard.classList.add("userCard", "flex", "center");
    userCard.setAttribute("id", "user" + i);
    const element = users[i];
    name.innerHTML = "Name:" + " " + element.name;
    age.innerHTML = "Age:" + " " + element.age;
    eyeColor.innerHTML = "Eye Color:" + " " + element.eyeColor;
    id.innerHTML = "ID:" + " " + element.id;
    editButton.innerHTML = "Edit";
    userCard.append(name, age, eyeColor, id, editButton);
    document.getElementById("userCard").appendChild(userCard);
  }
  // const object = JSON.stringify(users);
  // userList.innerHTML = object;
}
// Get a specific user
async function getSpecificUser(id) {
  const user = await makeRequest("/api/users/" + id, "GET");
  console.log(user);
}

// Save a new user
async function saveNewUser(name, eyeColor, age) {
  const body = { name: name, eyeColor: eyeColor, age: age };

  const status = await makeRequest("/api/users", "POST", body);
  console.log(status);
}

// Update specific user
async function updateUser(id, name, eyeColor, age) {
  const body = { name: name, eyeColor: eyeColor, age: age };
  const user = await makeRequest("/api/users/" + id, "PUT", body);
  console.log(user);
}

// Delete a user
async function deleteUser(id) {
  const user = await makeRequest("/api/users/" + id, "DELETE");
  console.log(user);
}

async function makeRequest(url, method, body) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });

  const result = await response.json();

  return result;
}

function hideResults() {
  const textBox = document.getElementById("userCard");
  textBox.innerHTML = "";
}
