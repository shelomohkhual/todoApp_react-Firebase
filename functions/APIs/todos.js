const { db } = require("../util/admin");

// INDEX – fetch all todos
exports.getAllTodos = (request, response) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(todos);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

// CREATE – create todo
exports.postOneTodo = (request, response) => {
  // Validation for Empty Title And Body
  if (request.body.title.trim() === "") {
    return response.status(400).json({
      title: "Must not be empty",
    });
  }

  if (request.body.body.trim() === "") {
    return response.status(400).json({
      body: "Must not be empty",
    });
  }

  const newTodo = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };

  db.collection("todos")
    .add(newTodo)
    .then((doc) => {
      const responseTodo = newTodo;
      responseTodo.id = doc.id;

      return response.json(responseTodo);
    })
    .catch((error) => {
      response.status(500).json({
        error: "Something went wrong",
      });

      console.error(error);
    });
};
