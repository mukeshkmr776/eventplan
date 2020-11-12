const fs = require('fs');
const path = require('path');

let configuration = {};

module.exports = {

    getConfiguration: function () {
        return configuration;
    },

    loadConfiguration: function (projectDirectory) {
        try {
            const configurationPath = path.normalize(path.join(__dirname, '..', '..', 'server.config.json'));

            fs.accessSync(configurationPath, fs.constants.R_OK);
            configuration = JSON.parse(fs.readFileSync(configurationPath).toString());

            // Additional configuration added at runtime.
            configuration.BASE_DIR = projectDirectory;
            configuration.DATA_FILES_PATH = !!configuration.DATA_FILES_PATH
                                            ? path.normalize(path.join(projectDirectory, configuration.DATA_FILES_PATH))
                                            : 'data';

            // Make sure DATA Files directory exists. If not, it will create it.
            if (!fs.existsSync(configuration.DATA_FILES_PATH)) {
                fs.mkdirSync(configuration.DATA_FILES_PATH, { recursive: true });
            }
        } catch (error) {
            console.log(error);
            configuration = {};
        }
    }

};
