'use strict';

const { headers, errorSchemas } = require('../../infrastructure/schemas');

const responseSchema = {
    type: 'object',
    properties: {
        todoId: {
            type: 'string',
            format: 'uuid'
        }
    }
};

const requestSchema = {
    tags: ['Todos'],
    summary: 'This api creates a todo',
    description: `<h3> This API let users to add a Todo </h3>`,
    headers,
    body: {
        title: 'Create a Todo',
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string', minLength: 1 },
            description: { type: 'string', minLength: 1 },
            label: { type: 'string' },
            dueDate: { type: ['string'], format: 'date-time' },
            priority: { type: 'string' }
        }
    }
};

module.exports = {
    ...requestSchema,
    response: {
        200: responseSchema,
        ...errorSchemas
    }
};
