let UserController = require('./controller');

module.exports = function (router) {

    router.post('/getuser'   ,  UserController.getUser    );
    router.post('/updateuser',  UserController.updateUser );

    return router;
}
