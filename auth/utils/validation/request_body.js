const Joi = require('joi');

const User = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(7).required()
})

const UserToken = Joi.object().keys({
    client_id: Joi.string().min(10).required(),
    user_token: Joi.string().min(30).required()
})


module["exports"] = {User, UserToken}