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

module.exports.newTodo = (todo, callback) => {
        todo.save(callback);
        }
