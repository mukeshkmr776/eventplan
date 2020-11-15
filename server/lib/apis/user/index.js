let UserController = require('./controller');
const JwtService = require('./../../services/jwt.service');

module.exports = function (router) {

    router.post('/',                    UserController.register);
    router.get('/',                     JwtService.validateJwtTokenMiddleware(['ADMIN']), UserController.getAll);

    router.post('/lockunlock',          JwtService.validateJwtTokenMiddleware(['ADMIN']), UserController.lockOrUnlock);
    router.post('/changepassword',      JwtService.validateJwtTokenMiddleware(['ADMIN']), UserController.changePassword);
    router.post('/changerole',          JwtService.validateJwtTokenMiddleware(['ADMIN']), UserController.changeRole);

    router.delete('/',                  JwtService.validateJwtTokenMiddleware(['ADMIN']), UserController.deleteAll);

    return router;
}
