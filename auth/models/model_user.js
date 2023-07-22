const db = require('../config/database');

function UserModel ({
    clientID,
    username,
    email,
    password,
    createdAt
}) {
    this.clientID = clientID;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
};

UserModel.prototype.createUser = function() {
    let query = `INSERT INTO users (client_id, username, email, password, created_at) 
                VALUES ($1, $2, $3, $4, $5)`;
    let params = [this.clientID, this.username, this.email, this.password, this.createdAt];
    return new Promise(async (resolve, reject) => {
        return await db.Database.Query(query, params).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
};

UserModel.prototype.getByUsernameAndEmail = async function() {
    let query = `SELECT * FROM users WHERE username=$1 AND email=$2`;
    let params = [this.username, this.email];
    return new Promise(async (resolve, reject) => {
        return await db.Database.Query(query, params).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
};

module.exports = UserModel;