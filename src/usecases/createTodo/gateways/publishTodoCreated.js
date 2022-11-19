const todoCreated = require('../../../events/todoCreated');
const amqp = require("../../../infrastructure/amqp");

module.exports = async function (todo) {
    todoCreated.publish(amqp.channel, {
        name: todo.name,
        todoId: todo._id
    });
};