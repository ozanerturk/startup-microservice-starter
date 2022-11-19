'use strict';
const envSchema = require('env-schema');

const { init, run } = require('./server');
const { config: envConfig } = require('../config/environmentVariables');
const lib = require('./infrastructure/lib');
const initDatabase = require("./infrastructure/database");

(async () => {
  const config = envSchema(envConfig);
  console.log('config', config);
  const { logger } = lib;
  try {

    await initDatabase({ config });
    const server = await init({ config });
    await run(server);

  } catch (error) {
    logger.error(error, 'Error While Starting the Server');
  }
})();