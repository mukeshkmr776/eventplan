const ConfigurationService = require('./configuration.service');
const EnvironmentService = require('./environment.service');
const ErrorService = require('./error.service');
const JwtService = require('./jwt.service');
const LoggerService = require('./logger.service');
const UtilityService = require('./utilities.service');

module.exports = {
    ConfigurationService,
    EnvironmentService,
    ErrorService,
    JwtService,
    LoggerService,
    UtilityService,

    // Initializing configuration. NOTE: Don't change the priorities.
    loadConfiguration: async function () {
        LoggerService.loadConfiguration();
        EnvironmentService.loadConfiguration();
        ConfigurationService.loadConfiguration();
    }
}
