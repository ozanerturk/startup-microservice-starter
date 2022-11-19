//mongoose model of Todo

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: String,
    description: String,
    label: String,
    dueDate: Date,
    priority: String
});

module.exports = mongoose.model('Todo', TodoSchema);