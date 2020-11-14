
const JWT = require('./jwt.service');

// This is only for development purpose.
console.log('admin token - \n', JWT.getJwtToken('admin'));
