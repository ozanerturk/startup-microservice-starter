const Todo = require('../../../models/todo');

module.exports = async function () {
    return await Todo.find({  });
};