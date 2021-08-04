const Configuration = require('./lib/services');
const { UtilityService } = require('./lib/services');
const server = require('./server');
const database = require('./lib/database/mongodb-adapter');

module.exports = {
    startApplication: async function () {
        try {
            await this.preApplication();
            await database.connect();
            await server.startServer();
        } catch (error) {
            console.error('Error while starting application:', error.message);
            console.error(error.stack);
            this.stopApplication(1);
        }
    },
    stopApplication: async function (code = 0) {
        try {
            await server.stopServer();
            await database.stop();
            process.exit(code)
        } catch (error) {
            process.exit(1);
        }
    },
    bootstrap: async function () {
        Configuration.loadConfiguration();
        const mode = UtilityService.isProduction() ? 'production' : 'development';
        if (!UtilityService.isProduction()) {
            console.log(`// --------------------------------------------`);
            console.log(`// Starting Application in ${mode} mode`);
            console.log(`// --------------------------------------------\n`);
        }
    },
    preApplication: async function () {
        this.bootstrap();
    },
    postApplication: async function () {
        // todo
    }
}
