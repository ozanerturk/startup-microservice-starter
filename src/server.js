'use strict';

require('make-promises-safe');
const fastify = require('fastify');
const cors = require('@fastify/cors');
const helmet = require('@fastify/helmet');
const swagger = require('@fastify/swagger');
const swaggerui = require('@fastify/swagger-ui');
const underPressure = require('@fastify/under-pressure');
const lib = require('./infrastructure/lib');

const { resolveRoutes } = require('./infrastructure/routes/index');
const { requestContext, onResponse, appendPayloadToResponse } = require('./infrastructure/hooks');
const setupGracefulShutdown = require('./shutdown');

const underPressureConfig = () => {
  return {
    healthCheck: async function () {
      // TODO: Add database connection check
      return true;
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000
  };
};

const init = async ({ config }) => {
  const { logger, uuid } = lib;
  const app = fastify({
    logger,
    genReqId: req => req.headers['x-request-id'] || uuid(),
    disableRequestLogging: true,
  });

  app.register(swagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    }
  });

  app.register(swaggerui, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true
  });
  app.decorate('config', config);
  app.register(cors);
  app.register(helmet, {
    noCache: true,
    policy: 'same-origin',
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self' 'unsafe-inline'"]
      }
    }
  });
  app.register(underPressure, underPressureConfig());
  app.register(require('@fastify/formbody'));


  app.register(resolveRoutes);

  app.addHook('preValidation', requestContext);
  app.addHook('preSerialization', appendPayloadToResponse);
  app.addHook('onResponse', onResponse);
  await app.ready();

  logger.info('Everything is Loaded..!');
  setupGracefulShutdown({ fastify: app });
  return app;
};

const run = app => app.listen({ port: app.config.PORT, host: app.config.HOST });

module.exports = { init, run };