(async () => {
    const Application = require('./application');
    await Application.startApplication();

    // SIGINT - Application shutdown hook
    process.on('SIGINT', (signal) => {
        console.log(`\nReceived signal "${signal}" - Application is about to shutdown...`);
        Application.stopApplication();
    });
})();
