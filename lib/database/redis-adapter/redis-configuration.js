const _ = require('lodash')

const MAX_ATTEMPTS = 3;
const MAX_TOTAL_RETRY_TIME = 1 * 60 * 1000 ; // 1Minute

module.exports = {
    host: 'localhost',
    port: '6379',
    retry_strategy: (options) => {
        console.log(`Reconnecting redis connection attempt ${options.attempt}/${MAX_ATTEMPTS}...`);

        if (options.error) {
            switch (options.error.code) {
                case "ECONNREFUSED":
                    error = new Error("The server refused the connection");
                    break;

                case "CONNECTION_BROKEN":
                    error = new Error("The redis server seems to be not up and running.");
                    break;

                default:
                    error = new Error("Something went wrong." + error.code + ":" + error.message + "\n" + error.stack);
            }
            return error;
        }

        if (options.total_retry_time > MAX_TOTAL_RETRY_TIME) { // 'total_retry_time in milliseconds
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error("Retry time exhausted");
        }

        // Max Attempts for reconnecting. If reched max-attempts, then return with null(means, fail with inbuilt error).
        if (options.attempt > MAX_ATTEMPTS) {
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 200, 3000);
    }
}