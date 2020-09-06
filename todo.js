const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({

title : {
        type: String,
        index: true,
        trim: true,
        require: true,
        unique: true
        },
category : {
        type: String,
        trim: true,
        require: true
        },
note : {
        type: String,
        trim: true,
        require:true
        }

});

const Todo = module.exports = mongoose.model("Todo", todoSchema);

module.exports.newTodo = (todo) => {
        const new_todo = new Todo(todo)
        new_todo.save()
        .then(the_todo => {
            res.json(the_todo)
        })
        .catch(err => {
            res.json({"error": err.message})
        })
}
