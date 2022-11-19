'use strict';

let getTodo = require("./gateways/getTodo");

module.exports = async fastify => {
    fastify.route({
        method: 'POST',
        url: '/todos',
        schema: require("./schema").createTodoSchema,
        handler: handler
    });
};

async function handler(request, reply) {
    console.log(request.body);
    let t = await getTodo(request.params.title);
    reply.code(201).send({ todoId: 3 });
};