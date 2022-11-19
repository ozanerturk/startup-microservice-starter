const Todo = require('../../../models/todo');

module.exports = async function (name) {
    return await Todo.findOne({ name:name});
};