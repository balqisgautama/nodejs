const logger = require( '../utils/logger' )( __filename );
const redis = require('redis');
const bluebird = require('bluebird');
const ConstGeneral = require('../constanta/general');
const {createClient} = require('redis');


let RedisConnection = {
    redClient: null,

    init: async function () {
        bluebird.promisifyAll(redis)
        const client = redis.createClient({
            url: ConstGeneral.REDIS_URL
        });
        client.on('connect', function () {
            logger.info('redis connected to ' + ConstGeneral.REDIS_URL);
        }).on('error', function (error) {
            logger.error("error occured when connecting redis Client ", error)
        } );
        
        this.redClient = client
    },
}

module["exports"] = RedisConnection;
