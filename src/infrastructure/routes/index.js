'use strict';
const { errorHandler } = require('../errors/handler');
const fs = require('fs');
const path = require('path');

const resolveRoutes = async fastify => {
    fastify.setErrorHandler(errorHandler);
    fs.readdirSync(path.join(__dirname, '../../usecases')).forEach(file => {
        let route = require(`../../usecases/${file}/route`);
        fastify.register(route);
    });

};

module.exports = { resolveRoutes };