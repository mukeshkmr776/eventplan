const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const UtilityService = require('./utilities.service');
const logger = require('./logger.service').getLogger();

let ENV_VARIABLES = null;

// -----------------------------------------------------------------------
// Something extra, very helpful for future
// -----------------------------------------------------------------------
const PROCESS_ENV_KEYS = ['USERNAME', 'HOME']
const PROCESS_ENV = PROCESS_ENV_KEYS.reduce((newValue, currentValue) => {
    newValue[currentValue] = process.env[currentValue] ?? null
    return newValue;
}, {})
// console.log(PROCESS_ENV);
// -----------------------------------------------------------------------

module.exports = {
    isProduction: function () {
        return process.env.NODE_ENV &&
               (
                   process.env.NODE_ENV['PROD'] ||
                   process.env.NODE_ENV['prod'] ||
                   process.env.NODE_ENV['PRODUCTION'] ||
                   process.env.NODE_ENV['production']
               )
    },
    getEnvVariable: function (key) {
        if (ENV_VARIABLES === null) {
            this.loadEnvironmentVariables();
        }
        return ENV_VARIABLES[key] ?? null;
    },
    loadEnvironmentVariables: function () {
        const envFilePath = path.resolve
        (
            UtilityService.getProjectRoot(),
            this.isProduction() ? '.env' : '.env-dev'
        )
        if (ENV_VARIABLES !== null) {
            return;
        }
        logger.info('Loading environment from locally: %s', envFilePath);
        if (fs.existsSync(envFilePath)) {
            ENV_VARIABLES = dotenv.config({ path: envFilePath }).parsed ?? {};
        } else {
            logger.warn('Local .env file doesn\'t exists at path: %s', envFilePath);
        }
    },
    loadConfiguration: function () {
        this.loadEnvironmentVariables();
    }
}
