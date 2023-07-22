const UserModel = require("../models/model_user");
const uuid = require('uuid');
const UtilsEncrypt = require("../utils/encrypt");

let UserDAO = {
    CreateUser: function (username, email, password) {
        let clientID = uuid.v1();
        let createdAt = Date.now();
        let temp = password;
        password = UtilsEncrypt.Bcrypt(temp);
        const user = new UserModel({clientID, username, email, password, createdAt});
        return user.createUser();
    },
    GetByUsernameAndEmail: function (username, email) {
        const user = new UserModel({username, email});
        return user.getByUsernameAndEmail();
    }
}

module["exports"] = UserDAO;