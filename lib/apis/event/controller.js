const { merge } = require('lodash');

let Event = require('../../models').getSchema('Event');
const EventService = require('./service');

module.exports = {

    'createEvent': async function (req, res) {
        console.log('createEvent Params-', JSON.stringify(req.body));
        if (!req.body.name) {
            return res.status(400).send('Bad Request');
        }

        let newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            subtitle: req.body.subtitle,
            data: req.body.data,
            configuration: req.body.configuration,
        });

        newEvent.save((err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Something went wrong: ' + err.message);
                return;
            };
            res.send(result);
        });
    },

    'getEvent': async function (req, res) {
        const { id } = req.params;
        console.log('getEvent Params-', id);
        if (id) {
            Event.findById({_id: String(id)}).lean().exec((err, event) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Something went wrong: ' + err.message);
                };

                if(!event) {
                    console.log('Event not found with Id-"%s" \n', id);
                    return res.status(404).send();
                }

                event = EventService.applyStatuses([event]);

                res.send(event[0]);
            });
        } else {
            console.log('Return all data');
            const category = (req.query && req.query.category) ? String(req.query.category).trim().toLowerCase() : '';
            const params = {
                category: !!category ? category : '',
                limit: req.query.limit ? Number(req.query.limit) : 0,
                skip: req.query.skip ? Number(req.query.skip) : 0,
            };
            console.log(params);

            Event
                .find()
                .select({ data: 0 }) // Removing data field from result
                .skip(params.skip)
                // .limit(params.limit)
                .lean()
                .exec((err, events) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Something went wrong: ' + err.message);
                    };

                    events = EventService.applyStatuses(events);
                    if (!!params.category) {
                        events = EventService.filterEventByCategory(params.category, events);
                    }

                    if (params.limit > 0) {
                        events = events.slice(0, params.limit);
                    }

                    res.send(events);
                })
        }
    },

    'updateEvent': async function (req, res) {
        console.log('updateEvent Params-', req.params.id);
        const { id } = req.params;
        if(!id) {
            return res.status(400).send('Bad Request');
        }

        Event.findById({_id: String(id)}, (err, event) => {
            if (err) {
                console.log(err);
                return res.status(404).send('Unable to find event with id-' + id);
            };

            let { body } = req;
            event = merge(event, body);

            event.save((err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Something went wrong: ' + err.message);
                };
                res.send(result);
            });

        });



    },

    'deleteEvent': async function (req, res) {
        console.log('deleteEvent Params-', req.params.id);
        if(req.params.id) {
            Event.deleteOne({ _id: String(req.params.id) }, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Something went wrong: ' + err.message);
                };
                res.send(result);
              });
        } else {
            Event.deleteMany({}, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Something went wrong: ' + err.message);
                };
                res.send(result);
            });
        }
    }

}
