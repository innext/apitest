const express = require("express");
const app = express();
const Todo = require("./todo")
const mongoose = require("mongoose");

// connection to MongoDB
const url = process.env.DATABASE_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.log("unable to connect MongoDB");
  console.log(error);
});

app.get("/", (req, res) => {
  res.json({"message": "Welcome to this todo, you to provide title, category and note"
  });
});

app.post("/", (req, res) => {
  const todo = {
    "title" : req.body.title,
    "category" : req.body.category,
    "note" : req.body.note
    }

  Todo.newTodo(todo, (err, todo) => {
    if(err) {
      console.log(err);
    } else {
      console.log(todo);
    }
    res.redirect("/todo", 201);
  });
});

app.get("/todo", (req, res) => {
  Todo.find({}, (err, allTodo) => {
    if(err) {
      console.log(err);
    } else {
      console.log(allTodo);
      res.send(allTodo);
    }
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
