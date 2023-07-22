const RedisConnection = require("./config/redis");
const MainRouter = require("./router/router_main");

RedisConnection.init()
MainRouter.init()