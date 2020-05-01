let User = require('../../database/schemas').getSchema('User');
const UserService = require('./../user/service');
const JwtService = require('./../../services/jwt.service');

module.exports = {

    'login': async function (req, res) {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send('Bad Request');
        }

        try {
            const user = await UserService.authenticate(User, username, password);
            const Token = JwtService.getJwtToken(username, user.get('role'));

            res.set('Authorization', Token);
            res.status(200).send({
                username: user.get('username'),
                role: user.get('role') || '',
                token: Token
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

}
