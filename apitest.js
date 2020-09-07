const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const Todo = require("./todo");
const port = process.env.PORT

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({"message": "Welcome to this todo, you to provide title, category and note"});
});

app.get("/todo", (req, res) => {
  Todo.find({}, (err, allTodo) => {
    if(err) {
      console.log(err);
    } else {
      console.log(allTodo);
      res.json(allTodo);
    }
  });
});


app.post("/", (req, res) => {
  const todo = {
    "title":req.body.title,
    "category":req.body.category,
    "note":req.body.note
    }

  Todo.newTodo(todo, (err) => {
    if (err) {
      res.json({"error": err});
    } else {
      res.json(todo);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
