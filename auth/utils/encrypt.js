const bcrypt = require("bcrypt")
const ConstGeneral = require("../constanta/general")

let UtilsEncrypt = {
    Bcrypt: function (input) {
        return bcrypt.hashSync(input, ConstGeneral.BCRYPT_SALT)
    }
}
module["exports"] = UtilsEncrypt;