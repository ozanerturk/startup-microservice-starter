'use strict';

let getTodos = require("./gateways/getTodos");
module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/todos',
        schema: require("./schema"),
        handler: handler
    });
};

async function handler(request, reply) {
    //validation has already done by ajv with schema, we have a rocksolid request to work with

    //call gateway 
    let t = await getTodos();

    //schema will filter only defined fields in response
    reply.code(200).send(t);

};