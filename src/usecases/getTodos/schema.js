'use strict';

const { headers, errorSchemas } = require('../../infrastructure/schemas');

const responseSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
        }
    }

};

const requestSchema = {
    tags: ['Todos'],
    summary: 'This api creates a todo',
    description: `<h3> This API let users to add a Todo </h3>`,
    headers,
    query: {

    }
};

module.exports = {
    ...requestSchema,
    response: {
        200: responseSchema,
        ...errorSchemas
    }
};
