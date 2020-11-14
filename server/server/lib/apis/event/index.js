let EventController = require('./controller');
const JwtService = require('./../../services/jwt.service');

module.exports = function (router) {

    router.get('/',          EventController.getEvent );
    router.get('/:id',       EventController.getEvent );

    router.post('/',         JwtService.validateJwtTokenMiddleware(), EventController.createEvent );
    router.put('/:id',       JwtService.validateJwtTokenMiddleware(), EventController.updateEvent );

    router.delete('/',       JwtService.validateJwtTokenMiddleware(), EventController.deleteEvent );
    router.delete('/:id',    JwtService.validateJwtTokenMiddleware(), EventController.deleteEvent );

    return router;
}
