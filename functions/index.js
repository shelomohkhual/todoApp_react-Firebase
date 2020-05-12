const functions = require("firebase-functions");
const app = require("express")();

const {
  getAllTodos,
  postOneTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

app.get("/todos", getAllTodos);
app.post("/todo", postOneTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

const { logInUser, signUpUser } = require("./APIs/users");

app.post("/login", logInUser);
app.post("/signup", signUpUser);

exports.api = functions.https.onRequest(app);
