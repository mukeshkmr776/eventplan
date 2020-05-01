const mongoDB = require('./server/lib/database/mongodb');
const server = require('./server/index');

let serverInstance = null;
let mongoDBInstance = null;


mongoDB.connect((error, _dbInstance) => {
    if (error) {
        console.log('ERROR: Not able to connect MongoDB database due to: ', error);
        return;
    }
    mongoDBInstance = _dbInstance;

    server.startServer((error2, _serverInstance) => {
        if (error) {
            console.log('ERROR: Unable to start server due to: ', error);
            return;
        }
        serverInstance = _serverInstance;
    });
});

function stopApplication(code) {
    console.log('Stopping server...');
    server.stopServer(serverInstance, () => {
        console.log('Successfully stopped server!');
        serverInstance = null;
    });

    console.log('Stopping database...');
    mongoDB.disconnect(mongoDBInstance, () => {
        console.log('Successfully stopped database!')
        mongoDBInstance = null;
    });
}

// SIGINT - Application shutdown hook
process.on('SIGINT', (code) => {
    console.info(`[${code}] Server is about to shutdown...`);
    stopApplication(code);
});

