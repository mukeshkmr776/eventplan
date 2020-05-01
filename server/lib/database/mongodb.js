
const mongoose = require('mongoose');
const Schemas = require('./schemas');

let DBConfiguration = {};
if (process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase().includes('prod')) {
    DBConfiguration = require('../../lib/config/db.config.prod.json');
} else {
    DBConfiguration = require('../../lib/config/db.config.dev.json')
}

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
