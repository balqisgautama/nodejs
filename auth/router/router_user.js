const express = require('express');
const router = express.Router();
const ServiceUser = require('../services/service_user');
const reqBodyValidation = require('../utils/validation/request_body');
const MiddlewareValidation = require('./middleware/middleware_validation');


router.route('/add').post(
    MiddlewareValidation.RequestBody(reqBodyValidation.User), 
    async (req, res, next) => {
        ServiceUser.AddUser(req, res);
});

module.exports = router