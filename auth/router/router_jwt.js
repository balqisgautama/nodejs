const express = require('express');
const ServiceTokenUser = require('../services/token/service_token_user');
const router = express.Router();
const reqBodyValidation = require('../utils/validation/request_body');
const MiddlewareValidation = require('./middleware/middleware_validation');


router.route('/user/generate').post(
    MiddlewareValidation.RequestBody(reqBodyValidation.User), 
    async (req, res, next) => {
        ServiceTokenUser.Generate(req, res);
});

router.route('/user/validate').post(
    MiddlewareValidation.RequestBody(reqBodyValidation.UserToken), 
    async (req, res, next) => {
        ServiceTokenUser.Validate(req, res);
});

module.exports = router