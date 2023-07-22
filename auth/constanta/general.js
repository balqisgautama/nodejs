const { StatusCodes } = require('http-status-codes');

let ConstGeneral = {};

// server
ConstGeneral.PORT = process.env.PORT;
ConstGeneral.HTTP_CODE = StatusCodes;
ConstGeneral.DATABASE_URL = process.env.DATABASE_URL;
ConstGeneral.REDIS_URL = process.env.REDIS_URL; //redis[s]://[[username][:password]@][host][:port][/db-number]

// log
ConstGeneral.LOG_LEVEL = process.env.LOG_LEVEL;
ConstGeneral.LOG_PATH = process.env.LOG_PATH;

// encrypt
ConstGeneral.BCRYPT_SALT = "$2b$07$K9EXIIzgA6YEvtnT0L0CTu";

// jwt
ConstGeneral.SECRET_JWT = "19345f6b-4cc3-4f88-93a7-e5b064b8d7b5"
// jwt user token
ConstGeneral.USER_TOKEN_EXPIRED = 60 * 60 * 3 // 3 jam

// redis
// redis 


module["exports"] = ConstGeneral;