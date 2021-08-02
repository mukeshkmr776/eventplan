
const user = require('./user');
const event = require('./event');

let allSchemas = {};

module.exports = {
    'registerAllSchemas': function (mongoose) {
        if(mongoose == null) {
            console.warn('WARN: Unable to register schema due to invalid database instance');
            return;
        }
        // @--------------------------------------------------
        // @ Importing all Schemas here
        // @--------------------------------------------------
        allSchemas = {
             User : user.registerSchema(mongoose),
            Event : event.registerSchema(mongoose),
        }
        // allSchemas[user.SCHEMA_NAME]  = user.registerSchema(mongoose);
        // allSchemas[event.SCHEMA_NAME] = event.registerSchema(mongoose);
        // @--------------------------------------------------
    },

    'getSchema': function (schemaName) {
        if(!schemaName) {
            return null;
        }
        return allSchemas[schemaName] ?? null;
    }
}