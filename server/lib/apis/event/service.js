const moment = require('moment')

module.exports = {
    filterEventByCategory: function (category, events) {
        let filteredData = [];
        events.forEach(event => {
            switch (category.trim().toLowerCase()) {
                case 'live':
                    event.status.isLive ? filteredData.push(event) : filteredData;
                    break;

                case 'expired':
                    event.status.isExpired ? filteredData.push(event) : filteredData;
                    break;

                case 'startingsoon':
                case 'starting soon':
                    event.status.isStartingSoon ? filteredData.push(event) : filteredData;
                    break;

                case 'recentlyadded':
                case 'recently added':
                            event.status.isRecentlyAdded ? filteredData.push(event) : filteredData;
                    break;

                default:
                    break;
            }
        });

        return filteredData;
    },

    applyStatuses: function (events) {
        events.forEach(event => {
            const statuses = { isLive: false, isExpired: false, isStartingSoon: false, isRecentlyAdded: false };

            if (moment(event.startsOnDate).isBefore(Date.now())) {
                if (moment(event.expiresOnDate).isAfter(Date.now())) {
                    statuses.isLive = true;
                } else {
                    statuses.isExpired = true;
                }
            } else {
                statuses.isStartingSoon = true;
            }

            if (moment(new Date()).diff(moment(new Date(event.createdDate)), 'hours') <= 24) {
                statuses.isRecentlyAdded = true;
            }

            event.status = statuses;
        });

        return events;
    }


}