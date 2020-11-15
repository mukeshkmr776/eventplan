
const mongoose = require('mongoose');
const Schemas = require('./schemas');
const UtilityService = require('../../services/utilities.service');

let DBConfiguration = {};
if (UtilityService.isProd()) {
    if (process.env.MONGODB_URL && process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
        DBConfiguration = {
            "MONGODB": {
                "URI": process.env.MONGODB_URL,
                "USERNAME": process.env.MONGODB_USERNAME,
                "PASSWORD": process.env.MONGODB_PASSWORD
            }
        }
    } else {
        throw new Error('MongoDB Credentials not present.');
    }
} else {
    DBConfiguration = require('../../config/db.config.dev.json');
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
