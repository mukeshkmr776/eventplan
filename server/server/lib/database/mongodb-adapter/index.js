
const mongoose = require('mongoose');
const Schemas = require('./schemas');

const DBConfiguration = {
    "MONGODB_URL": process.env.MONGODB_URL,
    "MONGODB_USERNAME": process.env.MONGODB_USERNAME,
    "MONGODB_PASSWORD": process.env.MONGODB_PASSWORD
};

module.exports = {
    'connect': async function (callback) {
        console.log('MongoDB URI: ', DBConfiguration.MONGODB_URL);
        mongoose.Promise = global.Promise;
        try {
            const _instance = await mongoose.connect(DBConfiguration.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Successfully connected to MongoDB using uri: ' + DBConfiguration.MONGODB_URL + '\n');
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
