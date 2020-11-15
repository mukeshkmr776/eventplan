const RedisInstance = require('./_instance');

module.exports = class RedisService {

    static getNewInstance() {
        return RedisInstance.getNewInstance();
    }

    static getDefaultInstance() {
        return RedisInstance.getDefaultInstance();
    }

    static async get(key) {
        const client = await this.getDefaultInstance();
        return await client.getAsync(key);
    }

    static async set(key, value) {
        const client = await this.getDefaultInstance();
        return await client.setAsync(key, value);
    }

    static async stopConnection(client) {
        return RedisInstance.stopConnection(client);
    }

}
