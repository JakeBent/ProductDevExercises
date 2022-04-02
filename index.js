const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const models = require('./models');

const {
  Todo,
} = models;

const app = express();

app.use(morgan());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017')

// todo

/**
 * @api [get] /todos
 * bodyContentType: "application/json'"
 * description: "Return all todos"
 * response:
 *  "200":
 *    description: "A list of todos"
 *    schema:
 *      type: "Array"
 */
app.get('/todos', async (req, res) => {
  const todos = await Todo.find({});

  res.json(todos);
});

/**
 * @api [post] /todos
 * bodyContentType: "application/json'"
 * description: "Create a new todo"
 * response:
 *  "201":
 *    description: "The created todo"
 *    schema:
 *      type: "Object"
 */
app.post('/todos', async (req, res) => {
  const {
    body: {
      text,
      priority,
    }
  } = req;

  const params = {
    text,
    priority,
  };

  try {
    const newTodo = await Todo.create(params);
    res.json(newTodo);
  } catch (error) {
    res.status(500).send(error);
  }
})

/**
 * @api [patch] /todos/{todoId}
 * bodyContentType: "application/json'"
 * description: "Edit a existing todo"
 * parameters:
 *  name: "Todo ID"
 *  in: "path"
 *  required: "true"
 *  description: "ID of todo to edit"
 * response:
 *  "200":
 *    description: "The created todo"
 *    schema:
 *      type: "Object"
 */
app.patch(`/todos/:todoId`, async (req, res) => {
  const {
    body,
    params: {
      todoId,
    },
  } = req;

  const updatedTodo = await Todo.updateOne(
    { _id: todoId },
    { $set: body },
    { new: true },
  );

  res.json(updatedTodo);
});

// calculator


// counter

// get counter

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
