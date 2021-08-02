const _instance = require('./_instance');
const SchemaModels = require('../../models');

let mongoInstance = null;

module.exports = {
    getInstance: function () {
        return mongoInstance;
    },

    connect: async function (cb = () => {}) {
        const DBConfiguration = {
            MONGODB_URL: process.env.MONGODB_URL,
            MONGODB_USERNAME: process.env.MONGODB_USERNAME,
            MONGODB_PASSWORD: process.env.MONGODB_PASSWORD
        };
        if (mongoInstance !== null) {
            return mongoInstance;
        }
        mongoInstance = await _instance.connect(DBConfiguration, cb);
        this.postStart(mongoInstance);
        return mongoInstance;
    },

    stop: async function () {
        console.log('Stopping database...');
        if (_instance !== null) {
            await _instance.disconnect();
        }
        console.log('Successfully stopped database!');
    },

    postStart: function () {
        SchemaModels.registerAllSchemas(mongoInstance);

        const passport = require('passport');
        const LocalStrategy = require('passport-local').Strategy;

        const User = SchemaModels.getSchema('User');
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }
}
