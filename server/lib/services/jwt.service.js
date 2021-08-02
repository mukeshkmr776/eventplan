const jwt = require('jsonwebtoken');

const BEARER_KEY = 'Bearer';
const AUTHORIZATION_HEADER_KEY = 'Authorization';

module.exports = {

    getJwtToken: function (username, role) {
        const payload = {
            username: username,
            role: role,
            time: new Date()
        };

        const rawToken =  jwt.sign
            (
                { data: payload },
                'secret',
                { expiresIn: '6h' }
            );

        return `${BEARER_KEY} ${rawToken}`;
    },

    validateJwtToken: function (token) {
        if (!token) {
            return false;
        }

        token = this.stripOffBearerKey(token);
        let flag = false;
        try {
            const decoded = jwt.verify(token, 'secret');
            flag = decoded;
        } catch (error) {
            flag = false;
        }
        return flag;
    },

    validateJwtTokenMiddleware: function (roles = []) {
        return (req, res, next) => {
            const decoded = this.validateJwtToken(req.get(AUTHORIZATION_HEADER_KEY))
            if (decoded) {
                if (typeof roles === 'string') {
                    roles = [roles];
                }
                req.user = {
                    username: decoded.data.username,
                    role: decoded.data.role
                };

                if (roles.length && !roles.includes(req.user.role)) {
                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                next();
            } else {
                return res.status(401).send();
            }
        }
    },

    stripOffBearerKey: function (token) {
        return token.substring(token.indexOf(BEARER_KEY) + BEARER_KEY.length).trim();
    }

}
