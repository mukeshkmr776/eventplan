const mongoose = require('mongoose');
const UtilityService = require('../../../services/utilities.service');

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
    DBConfiguration = require('../../../config/db.config.dev.json');
}


console.log('MongoDB URI: ', DBConfiguration.MONGODB.URI);
mongoose.Promise = global.Promise;

mongoose.connect(DBConfiguration.MONGODB.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connection test successfully!');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log('Error: Not able to connect MongoDB database.', err);
    });
