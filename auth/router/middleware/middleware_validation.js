const ConstGeneral = require('../../constanta/general');
const RespCode = require('../../constanta/response_code');
const RespHandler = require('../../utils/handler/response');
const logger = require('../../utils/logger')(__filename);

let MiddlewareValidation = {
    RequestBody: function (schema) {
        return (req, res, next) => { 
            const { error } = schema.validate(req.body); 
            const valid = error == null; 
            if (valid) { 
              next(); 
            } else { 
              const { details } = error; 
              const message = details.map(i => i.message).join(',');
                logger.error("invalid request body", message)
                RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.UNPROCESSABLE_ENTITY, RespCode.INVALID_FIELD, message);
            } 
        } 
    }
}

module["exports"] = MiddlewareValidation;