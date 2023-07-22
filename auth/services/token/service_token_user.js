const DescError = require("../../constanta/description_error");
const ConstGeneral = require("../../constanta/general");
const RespCode = require("../../constanta/response_code");
const UserDAO = require("../../dao/dao_user");
const UtilsChecking = require("../../utils/checking");
const UtilsEncrypt = require("../../utils/encrypt");
const RespHandler = require("../../utils/handler/response");
const UtilsUserToken = require("../../utils/jwt/token_user");
const UtilsRedis = require("../../utils/redis");

let ServiceTokenUser = {
    Generate: function (req, res) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        UserDAO.GetByUsernameAndEmail(username, email).then(userFound => {
            if (UtilsChecking.IsEmpty(userFound.rows)) {
                RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.BAD_REQUEST, RespCode.ERROR_USER_NOT_FOUND, DescError.USER_NOT_FOUND);
                return
            }
            let user = userFound.rows[0]
            let passwordEncrypt = UtilsEncrypt.Bcrypt(password)
            if (passwordEncrypt != user.password) {
                RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.UNAUTHORIZED, RespCode.ERROR_ACCESS, DescError.INVALID_PASSWORD);
                return
            }
            let userToken = UtilsUserToken.Generate(user.client_id);
            UtilsRedis.Set(user.client_id, userToken, ConstGeneral.USER_TOKEN_EXPIRED);
            user.user_token = userToken;
            user.password = undefined;
            RespHandler.WithData(res, ConstGeneral.HTTP_CODE.OK, RespCode.OK, user);
        }).catch(err => {
            RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.BAD_REQUEST, RespCode.ERROR_SERVER, err.message);
        })
    },
    Validate: async function (req, res) {
        let client_id = req.body.client_id;
        let user_token = req.body.user_token;
        let redisUserToken = await UtilsRedis.GetAsync(client_id);
        let tokenData = UtilsUserToken.Validate(user_token);
        if (UtilsChecking.IsEmpty(redisUserToken) || client_id != tokenData.cid || user_token != redisUserToken) {
            RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.UNAUTHORIZED, RespCode.ERROR_ACCESS, DescError.INVALID_TOKEN);
            return
        }
        RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.OK, RespCode.OK, DescError.TOKEN_AUTHORIZED);
    }
}

module["exports"] = ServiceTokenUser;