const scmp = require('scmp');
const crypto = require('crypto');

const { ErrorService } = require('./../../services');
const { NotFound, InvalidUsernameOrPassword, UserAlreadyExist, OldAndCurrentPasswordSame } = ErrorService.EXCEPTIONS;

var SERVICE = {
    registerUser: async function (User, profile) {
        const user = await User.findByUsername(profile.username, false).exec();

        if (user) {
            throw new UserAlreadyExist('User already exists');
        }

        const salt = (crypto.randomBytes(32)).toString('hex');
        const newUser = new User({
            username: profile.username,
            password: Buffer.from(SERVICE.getHashFromPassword(salt, profile.password), 'binary').toString('hex'),
            salt: salt,
            role: profile.role
        })

        return newUser.save();
    },

    authenticate: async function (User, username, password) {
        const user = await User.findByUsername(username, true).exec();
        if (!user) {
            throw new NotFound('User doesn\'t exists');
        }

        const hashBuffer = SERVICE.getHashFromPassword(user.get('salt'), password);
        const hashBufferFromDB = Buffer.from(user.get('password'), 'hex');
        const isPasswordValid = scmp(hashBuffer, hashBufferFromDB);

        if (!isPasswordValid) {
            throw new InvalidUsernameOrPassword('Invalid username or password.');
        }

        return user;
    },

    changePassword: async function (User, username, oldPassword, newPassword) {
        if (oldPassword === newPassword) {
            throw new OldAndCurrentPasswordSame('Current and New password are same.');
        }

        const user = await SERVICE.authenticate(User, username, oldPassword);

        // Generating new salt and hash
        const newSalt = (crypto.randomBytes(32)).toString('hex');
        const newHash = Buffer.from(SERVICE.getHashFromPassword(newSalt, newPassword), 'binary').toString('hex');

        user.set('salt', newSalt);
        user.set('password', newHash);
        user.set('locked', false);

        return user.save();
    },

    LockOrUnlockUser: async function (User, username, flag) {
        const user = await User.findByUsername(username, true).exec();
        if (!user) {
            throw new NotFound('User doesn\'t exists');
        }

        flag = !!flag;

        user.set('locked', flag);
        return user.save();
    },


    changeRole: async function (User, username, newRole) {
        const user = await User.findByUsername(username, true).exec();
        if (!user) {
            throw new NotFound('User doesn\'t exists');
        }

        if (user.get('role') === newRole) {
            throw new new Error(`User is already assigned this role- ${newRole}`);
        }

        user.set('role', newRole);
        return user.save();
    },

    getHashFromPassword: function (salt, password) {
        return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
    }

};

module.exports = SERVICE;