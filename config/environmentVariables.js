'use strict';

const schema = {
    type: 'object',
    properties: {
        HOST: {
            type: 'string',
            default: '0.0.0.0'
        },
        PORT: {
            type: 'number',
            default: 3000
        },
        MONGODB_URI: {
            type: 'string'
        },
        MONGODB_DB_NAME: {
            type: 'string'
        },

    }
};

exports.config = { dotenv: true, schema };