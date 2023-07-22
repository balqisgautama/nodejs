const RedisConnection = require("../config/redis");

let UtilsRedis = {
    Set: function (key, value, expired) {
        RedisConnection.redClient.set(key, value, "EX", expired)
    },
    GetAsync: async function (key) {
        let data = await RedisConnection.redClient.getAsync(key)
        return data
    }
}

module["exports"] = UtilsRedis;