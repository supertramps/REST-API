window.addEventListener("load", initSite);

async function initSite() {
  console.log("Init");
  updateUser(1, "Eridd", "white", 10);
  deleteUser(2);
}

// Get all users
async function getAllUsers() {
  const users = await makeRequest("/api/users", "GET");

  for (let i = 0; i < users.length; i++) {
    const userList = document.createElement("div");
    userList.setAttribute("id", "user" + i);
    const element = users[i];
    userList.innerHTML = element.name;
    document.getElementById("textField").appendChild(userList);
    console.log(element.name);
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
  const textBox = document.getElementById("textField");
  textBox.innerHTML = "";
}
