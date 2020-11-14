const SCHEMA_NAME = 'Event';

module.exports = {
    'SCHEMA_NAME': SCHEMA_NAME,

    'getSchema': function () {
        return mongoose.model(SCHEMA_NAME);
    },

    'registerSchema': function (mongoose) {
        return mongoose.model(SCHEMA_NAME, mongoose.Schema({
            name: {
                type: String
            },
            description: {
                type: String,
                default: ''
            },
            subtitle : {
                type: String,
                default: ''
            },
            data: {
                type: String,
                default: ''
            },
            configuration: {
                backgroundColor: {
                    type: String,
                    default: '#1976d2' // Blue
                },
                textColor: {
                    type: String,
                    default: '#ffffff' // White
                },
                imageSrc: {
                    type: String,
                    default: '' // default image url. Must be present in asset/static folder.
                }
            },
            createdDate: { type: String, default: new Date().toISOString() },
            updatedDate: { type: String, default: null },

            startsOnDate:  { type: String, default: new Date().toISOString() },
            expiresOnDate: {
                type: String,
                default: function () {
                    const date = new Date(this.startsOnDate);
                    date.setDate(date.getDate() + 1);
                    return date.toISOString();
                }
            }

        }));

    }
}