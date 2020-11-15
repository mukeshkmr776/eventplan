
let SharedController = require('./controller');

module.exports = function (router) {
    router.get('/count', SharedController.getCount);

    return router;
}
