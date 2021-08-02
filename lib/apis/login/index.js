let LoginController = require('./controller');

module.exports = function (router) {

    router.post('/', LoginController.login);

    return router;
}
