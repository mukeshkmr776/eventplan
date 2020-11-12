// Imports. Dont change the order.
const ConfigurationService = require('./server/lib/services/configuration.service');
ConfigurationService.loadConfiguration(__dirname);

// Server instance import
const server = require('./server/index');

let serverInstance = null;

// Starting Application
server.startServer((error, _serverInstance) => {
    if (error) {
        console.log('ERROR: Unable to start server due to: ', error);
        return;
    }
    serverInstance = _serverInstance;
});

// Stop Application
function stopApplication(code) {
    server.stopServer(serverInstance, () => {
        console.log('Successfully stopped server!');
        serverInstance = null;
    });
}

// SIGINT - Application shutdown hook
process.on('SIGINT', (code) => {
    console.info(`[${code}] Server is about to shutdown...`);
    stopApplication(code);
});

