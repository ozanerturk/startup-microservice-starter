'use strict';
const envSchema = require('env-schema');

const { init, run } = require('./server');
const { config: envConfig } = require('../config/environmentVariables');
const lib = require('./infrastructure/lib');
const rabbitmq = require("./infrastructure/amqp");
const database = require('./infrastructure/database');

(async () => {
  const config = envSchema(envConfig);
  const { logger } = lib;
  try {

    await database.init({ config });
    await rabbitmq.init({ config });

    const server = await init({ config });
    await run(server);

  } catch (error) {
    logger.error(error, 'Error While Starting the Server');
  }
})();