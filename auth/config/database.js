const { Pool } = require('pg');
const ConstGeneral = require('../constanta/general');
const logger = require('../utils/logger')(__filename);

const pool = new Pool({
    connectionString: ConstGeneral.DATABASE_URL
});

let Database = {
    Query: function(text, params) {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            return await pool.query(text, params).then(result => {
                const duration = Date.now() - start;
                logger.info("executed query", duration)
                return resolve(result)
            }).catch(err => {
                return reject(err)
            });
        });
    }
}

module.exports = {Database};