const DescError = require('../constanta/description_error');
const ConstGeneral = require('../constanta/general');
const RespCode = require('../constanta/response_code');
const UserDAO = require('../dao/dao_user');
const UtilsChecking = require('../utils/checking');
const RespHandler = require('../utils/handler/response');

let ServiceUser = {
    AddUser: function (req, res) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        UserDAO.CreateUser(username, email, password).then(userCreated => {
            RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.OK, RespCode.OK, DescError.OK);
        }).catch(err => {
            if (!UtilsChecking.IsEmpty(err.table)) {
                RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.BAD_REQUEST, RespCode.ERROR_POSTGRESQL, err.detail);
                return
            }
            RespHandler.WithData(res, ConstGeneral.HTTP_CODE.BAD_REQUEST, RespCode.ERROR_UNKNOWN, err);
        })
    }
}

module["exports"] = ServiceUser;