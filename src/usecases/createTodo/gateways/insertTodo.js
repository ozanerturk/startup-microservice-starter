const Todo = require('../../../models/todo');

module.exports = async function (todo) {
    return await Todo.create(todo);
};