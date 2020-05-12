const { db } = require("../util/admin");

// GET – fetch all todos
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

// POST – create todo
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

// DELETE – delete todo
exports.deleteTodo = (request, reponse) => {
  const document = db.doc(`/todos/${request.params.todoId}`);

  document
    .get()
    .then((doc) => {
      // check "todo" exist in DB, to prevent error
      if (!doc.exists) {
        return response.status(404).json({
          error: "Todo not found",
        });
      }

      return document.delete();
    })
    .then(() => {
      reponse.json({
        message: "Delete successful",
      });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({
        error: error.code,
      });
    });
};

// PUT – Edit todo
exports.editTodo = (request, response) => {
  // validation : restrict editing "ID" and "CreatedAt"
  if (request.body.todoId || request.body.createdAt) {
    return response.status(403).json({
      message: "Not allowed to edit",
    });
  }

  let document = db.collection("todos").doc(request.params.todoId);

  document
    .update(request.body)
    .then(() => {
      response.json({
        message: "Update successfully",
      });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({
        error: error.code,
      });
    });
};
