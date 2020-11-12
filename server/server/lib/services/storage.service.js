const fs = require('fs');
const path = require('path');

const stripJsonComments = require('strip-json-comments');

const ServerConfiguration = require('./configuration.service').getConfiguration();

module.exports = {
    readDataFile: function (fileName) {
        return new Promise((resolve, reject) => {
            const fullPath = path.join(ServerConfiguration.DATA_FILES_PATH, fileName);

            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                let rawData = fs.readFileSync(fullPath).toString();
                let parsedData = JSON.parse(stripJsonComments(rawData));

                return resolve(parsedData);
            } catch (error) {
                return reject(error);
            }
        });

    },

    writeDataFile: function (fileName, data) {
        return new Promise((resolve, reject) => {
            const fullPath = path.join(ServerConfiguration.DATA_FILES_PATH, fileName);

            try {
                fs.accessSync(fullPath, fs.constants.W_OK);
                fs.writeFileSync(fullPath, data);

                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    }

};