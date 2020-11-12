const Service = require('./service');
const DataService = require('./../../services/storage.service');

let ServerListData = [];

DataService.readDataFile('serverlist.json')
    .then(response => ServerListData = response.data)
    .catch(error => ServerListData = []);

module.exports = {

    'getUser': async function (req, res) {
        const { ipaddress } = req.body;
        console.log(ipaddress);
        DataService.readDataFile('serverlist.json');
        res.send();
    },

    'updateUser': async function (req, res) {
        const { ipaddress, username } = req.body;
        console.log(ipaddress, username);
        res.send();
    }

}
