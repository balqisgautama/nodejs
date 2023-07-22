const jwt = require( 'jsonwebtoken' );
const ConstGeneral = require('../../constanta/general');

let UtilsUserToken = {
    Generate: function (clientID) {
        let payload = {
            cid: clientID,
            exp: Math.floor(Date.now() / 1000) + ConstGeneral.USER_TOKEN_EXPIRED,
            iat: Math.floor(Date.now() / 1000)
        };
        let result = jwt.sign(payload, ConstGeneral.SECRET_JWT);
        return result;
    },

    Validate: function (token) {
        return jwt.verify(token, ConstGeneral.SECRET_JWT, function(err, decoded) {
            if (err) {
                return err;
            }
            return decoded;
        });
    }
};

module["exports"] = UtilsUserToken;