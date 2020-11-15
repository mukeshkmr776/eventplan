
const user = require('./user');
const event = require('./event');

let allSchemas = {};

module.exports = {
    'registerAllSchemas': function (mongoose) {
        // @--------------------------------------------------
        // @ Importing all Schemas here
        // @--------------------------------------------------
        allSchemas[user.SCHEMA_NAME]  = user.registerSchema(mongoose);
        allSchemas[event.SCHEMA_NAME] = event.registerSchema(mongoose);
        // @--------------------------------------------------
    },

    'getSchema': function (schema) {
        if(!schema) {
            return null;
        }
        return allSchemas[schema] || null;
    }
}