const winston = require('winston');
const ConstGeneral = require('../constanta/general');
const UtilsGenerate = require('./generate');
require('winston-daily-rotate-file');

let UtilsLogger = winston.createLogger({
    level: ConstGeneral.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({'timestamp':true}),
        new winston.transports.File({datePattern: "YYYY-MM-DD", filename: UtilsGenerate.LogFile(ConstGeneral.LOG_PATH), maxsize:'1000' })
    ]
});

module.exports = function(fileName) {
    return {
        error: function (text , meta) {
            UtilsLogger.error(fileName + ': ' + text , meta)
        },
        info: function (text , meta) {
            UtilsLogger.info(fileName + ': ' + text , meta)
        },
        debug: function (text , meta) {
            UtilsLogger.debug(fileName + ': ' + text , meta)
        },
        warn: function (text , meta) {
            UtilsLogger.warn(fileName + ': ' + text , meta)
        }
    }
};