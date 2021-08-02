const path = require('path');
const { promisify } = require('util');

const redis = require('redis');
const { v4: uuidv4} = require('uuid');

let RedisConfiguration = null;
try {
    RedisConfiguration = require(path.join(__dirname, 'redis-configuration'));
} catch (error) {
    console.log('Unable to load Redis Configuration with an error: ', error);
}

var _singleton = null;

const SERVICE = {


    getNewInstance: async () => {
        return SERVICE.createNewInstance();
    },

    getDefaultInstance: async () => {
        if (_singleton === null) {
            _singleton = await SERVICE.createNewInstance();
            console.log('Default Redis Connection uuid: ' + _singleton.uid + '\n');
        }
        return _singleton;
    },

    createNewInstance: () => {
        return new Promise((resolve, reject) => {

            let _instance = null;
            if (RedisConfiguration === null) {
                reject(new Error('Unable to load redis configuration.'));
            }
            _instance = redis.createClient(RedisConfiguration);
            _instance.uid = uuidv4();

            console.log('Created new Redis Connection with uid: ' + _instance.uid);

            _instance.on('ready', () => {
                SERVICE.addMethods(_instance);
                if (_singleton === null) {
                    _singleton = _instance;
                }
                resolve(_instance);
            });
            _instance.on('error', (error) => {
                if (_singleton && _singleton.uid === _instance.uid) {
                    _singleton = null;
                }
                _instance = null;
                reject(error);
            });
        })
    },

    stopConnection: (client) => {
        if (client) {
            client.quit(() => {
                _instance = null;
            });
        } else {
            if (_singleton !== null) {
                _singleton.quit(() => {
                    _singleton = null;
                    console.log('Redis Connection is closed now!');
                });
            } else {
                console.log('Redis Connection already closed!');
            }
        }
    },

    addMethods: (instance) => {
        instance.getAsync = promisify(instance.get).bind(instance);
        instance.setAsync = promisify(instance.set).bind(instance);
    }


}

module.exports = SERVICE;