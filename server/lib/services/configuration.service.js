const fs = require('fs');
const path = require('path');
const UtilityService = require('./utilities.service')


const CONFIGS = {};

function loadConfigFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath).toString());
        } else {
            console.warn('Warning: Unable to load config file: ', filePath);
            return {};
        }
    } catch (error) {
        console.warn('Error loading config file:', filePath);
    }
}

module.exports = {
    loadConfiguration: function () {
        CONFIGS.ServerConfiguration = loadConfigFile(path.join(UtilityService.getProjectRoot(), 'lib', 'config', 'server.config.json'));
        // console.log(`CONFIGS.ServerConfiguration=${JSON.stringify(CONFIGS.ServerConfiguration)}`);
    },

    getServerConfiguration: function () {
        return CONFIGS.ServerConfiguration;
    },
}
