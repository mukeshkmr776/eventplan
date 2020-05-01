
const moment = require('moment');


createdDate = '2020-04-29T12:28:46.323Z';
startsOnDate = '2020-02-30T12:28:46.323Z';
expiresOnDate = '2020-04-31T12:28:46.323Z';

var now = new Date();
console.log(now.toISOString());

var a = moment(new Date(createdDate));
var b = moment(new Date());

console.log(moment(new Date()).diff(moment(new Date(createdDate)), 'hours'));
