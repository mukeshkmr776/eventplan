const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, './../../../../../.env') });

const DBConfiguration = {
    "MONGODB_URL": process.env.MONGODB_URL,
    "MONGODB_USERNAME": process.env.MONGODB_USERNAME,
    "MONGODB_PASSWORD": process.env.MONGODB_PASSWORD
};

console.log('MongoDB URI: ', DBConfiguration.MONGODB_URL);
mongoose.Promise = global.Promise;

mongoose.connect(DBConfiguration.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connection test successfully!');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log('Error: Not able to connect MongoDB database.', err);
    });
