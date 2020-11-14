
const moment = require('moment');


startsOnDate = '2020-02-30T12:28:46.323Z';
expiresOnDate = '2020-04-29T12:28:46.323Z';

status = {
    isLive: false,
    isExpired: false,
    isComingSoon: false,
};

console.log(moment(startsOnDate).format());

if (moment(startsOnDate).isAfter(Date.now())) {
    if (moment(expiresOnDate).isBefore(Date.now())) {
        status.isLive = true;
    } else {
        status.isExpired = true;
    }
} else {
    status.isComingSoon = true;
}

console.log(status);
