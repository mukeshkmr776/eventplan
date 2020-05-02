const mongoose = require('mongoose');
const Schemas = require('./schemas');

const UtilityService = require('./../services/utilities.service');

module.exports = {
    'connect': async function (callback) {
        try {
            const DBConfiguration = this.getDBConfiguration();
            console.log('MongoDB URI: ', DBConfiguration.MONGODB.URI);

            mongoose.Promise = global.Promise;

            const _instance = await mongoose.connect(DBConfiguration.MONGODB.URI,{ useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Successfully connected to MongoDB using uri: ' + DBConfiguration.MONGODB.URI + '\n');

            Schemas.registerAllSchemas(mongoose);

            callback(null, _instance);
        } catch (error) {
            callback(error)
        }
    },

    disconnect: function (instance, cb) {
        if (instance) {
            instance.disconnect(cb);
        } else if (typeof cb === "function") {
            cb()
        }
    },

    getDBConfiguration: function () {
        if (UtilityService.isProd()) {
            return require('./../../lib/config/db.config.prod.json');
        } else {
            return require('././../../lib/config/db.config.dev.json')
        }
    }
}
