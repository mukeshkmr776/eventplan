module.exports = {
    getNewInstance: function () {
        const mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        return mongoose;
    },

    connect: async function (DBConfiguration, callback = () => {}) {
        const mongoose = this.getNewInstance();
        console.log('Connecting to database...');
        try {
            const _instance = await mongoose.connect(DBConfiguration.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Successfully connected to database.' + DBConfiguration.MONGODB_URL + '\n');
            callback(_instance);
            return _instance;
        } catch (error) {
            console.error('Error while connecting to database: ', error.message,);
            console.error(error.stack);
            throw error;
        }
    },

    disconnect: function (instance, cb) {
        if (instance) {
            instance.disconnect(cb);
        } else if (typeof cb === "function") {
            cb()
        }
    },

}
