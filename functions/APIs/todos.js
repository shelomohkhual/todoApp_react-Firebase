const { db } = require("../util/admin");

exports.getAllTodos = (request, response) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todosList = [];

      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });

      return response.json(todosList);
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: error.code });
    });
};
