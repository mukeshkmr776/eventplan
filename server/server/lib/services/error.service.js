const generaterr = require('generaterr');

module.exports = {

    EXCEPTIONS: {
        // GENERAL
        'SomethingWrong': generaterr('SomethingWrong'),
        'NotFound': generaterr('NotFound'),

        // PERMISSION
        'NotAuthorised': generaterr('NotAuthorised'),
        'NotAuthenticated': generaterr('NotAuthenticated'),
        'UserLocked': generaterr('UserLocked'),

        // LOGIN
        'InvalidUsernameOrPassword': generaterr('InvalidUsernameOrPassword'),

        // USER
        'UserAlreadyExist': generaterr('UserAlreadyExist'),
        'OldAndCurrentPasswordSame': generaterr('OldAndCurrentPasswordSame'),
        'OldAndCurrentPasswordMismatch': generaterr('OldAndCurrentPasswordMismatch'),

        // EVENT
        'EventNotFound': generaterr('EventNotFound')
    }

}

