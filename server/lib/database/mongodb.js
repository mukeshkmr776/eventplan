
const mongoose = require('mongoose');
const DBConfiguration = require('../../lib/config/db.config.json');
const Schemas = require('./schemas');

module.exports = {
    'connect': async function (callback) {
        console.log('MongoDB URI: ', DBConfiguration.MONGODB.URI);
        mongoose.Promise = global.Promise;
        try {
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
    }
}
