const SCHEMA_NAME = 'User';
const passportLocalMongoose = require('passport-local-mongoose');

module.exports = {
    'SCHEMA_NAME': SCHEMA_NAME,

    'getSchema': function () {
        return mongoose.model(SCHEMA_NAME);
    },

    'registerSchema': function (mongoose) {
        const schema = mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            salt: {
                type: String,
                required: true
            },
            createdDate: {
                type: Date,
                default: new Date()
            },
            lastLoginFailed: {
                type: Date,
                default: null
            },
            lastSuccessfullLogin: {
                type: Date,
                default: null
            },
            lastUpdated: {
                type: Date,
                default: new Date()
            },
            locked: {
                type: Boolean,
                default: false
            },
            attempts: {
                type: Number,
                default: 0
            },
            role: {
                type: String,
                required: true,
                enum: ['GUEST', 'ADMIN'],
                default: 'GUEST'
            }
        });

        // Attaching PassportLocalMongoose
        schema.plugin(passportLocalMongoose, {
            maxAttempts: 2,
            limitAttempts: true
        });

        return mongoose.model(SCHEMA_NAME, schema);
    }

}