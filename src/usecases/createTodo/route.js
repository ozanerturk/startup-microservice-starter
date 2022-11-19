'use strict';

let getTodo = require("./gateways/getTodo");
let insertTodo = require("./gateways/insertTodo");
module.exports = async fastify => {
    fastify.route({
        method: 'POST',
        url: '/todos',
        schema: require("./schema"),
        handler: handler
    });
};

async function handler(request, reply) {
    //validation has already done by ajv with schema
    let todo = request.body;
    console.log(todo)
    //call gateway 
    let t = await getTodo(todo.name);
    //busines logic
    if (t) {
        reply.code(409).send({ message: "Todo already exists" });
    } else {
        let todoInsertResult = await insertTodo({
            name: todo.name,
            description: todo.description,
            label: todo.label,
            dueDate: todo.dueDate
        });
        //(sayounara)
        reply.code(201).send({ todoId: todoInsertResult });
    }


};