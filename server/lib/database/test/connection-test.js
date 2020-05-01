const mongoose = require('mongoose');
const Configuration = require('../../../lib/config/db.config.json');

console.log('MongoDB URI: ', Configuration.MONGODB.URI);
mongoose.Promise = global.Promise;

mongoose.connect(Configuration.MONGODB.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connection test successfully!');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log('Error: Not able to connect MongoDB database.', err);
    });
