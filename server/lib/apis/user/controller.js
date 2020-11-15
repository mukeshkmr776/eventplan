let User = require('../../database/mongodb-adapter/schemas').getSchema('User');
let service = require('./service');

module.exports = {
    'register': async function (req, res) {
        const { username, password, role } = req.body;
        if (!(username && password && role)) {
            return res.status(400).send('Bad Request');
        }

        try {
            await service.registerUser(User, {username, password, role: String(role).trim().toUpperCase() })
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send({ error : error.message });
        }

        // Working, but kept for future references.
        // User.register(new User({ username : username }), password, (err, account) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).send({ error : err.message });
        //     }
        //     res.status(201).send();
        // });
    },

    'getAll': async function (req, res) {
        User.find((err, users) => {
            if (err) throw err;
            res.send(users);
        });
    },

    'deleteAll': async function (req, res) {
        User.deleteMany({}, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },

    'changePassword': async function (req, res) {
        const { username, oldPassword, newPassword } = req.body;
        if (!(username && oldPassword && newPassword)) {
            return res.status(400).send('Bad Request');
        }

        service.changePassword(User, username, oldPassword, newPassword)
            .then(response => {
                console.log('changed!');
                return res.status(200).send();
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error : err.message });
            });

    },

    lockOrUnlock: async function (req, res) {
        const { username, flag } = req.body;
        if (!(username && flag !== undefined)) {
            return res.status(400).send('Bad Request');
        }

        service.LockOrUnlockUser(User, username, flag)
            .then(response => {
                return res.status(200).send();
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error : err.message });
            });
    },

    changeRole: async function (req, res) {
        const { username, newRole } = req.body;
        if (!(username && newRole)) {
            return res.status(400).send('Bad Request');
        }

        service.changeRole(User, username, newRole)
            .then(response => {
                return res.status(200).send();
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error : err.message });
            });

    }


}
