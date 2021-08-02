let User = require('../../models').getSchema('User');
let Event = require('../../models').getSchema('Event');

module.exports = {
    'getCount': async function (req, res) {
        try {
            let userCount = await User.countDocuments({});
            let eventCount = await Event.countDocuments({});

            res.status(200).send({
                users: userCount,
                events: eventCount
            });
        } catch (err) {
            console.log('ERROR while getting count of collection.', err);
            res.status(500).send();
        }

    }

}