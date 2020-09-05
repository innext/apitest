


const express = require("express");
const app = express()
const Todo = require("./todo")
const mongoose = require("mongoose")

const bodyParser = require("body-parser")
const dotenv = require('dotenv');
dotenv.config()


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

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({"message": "Welcome to this todo, you to provide title, category and note"
  });
});

const todo = 
{
  "title":"",
  "category":"",
  "note":""
}

app.post("/", (req, res) => {
        
        todo.title = req.body.title
        todo.category = req.body.category
        todo.note = req.body.note
        res.json(todo)
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
