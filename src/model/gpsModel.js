const db = require('../../config/dbConnection');
const conn = db();

const getCar = (resultCallback) => {
    conn.query('SELECT imeino, plate, simno FROM car', (err, res) => {
        if (err) {
            resultCallback(err, null);
        }
        resultCallback(null, res);
    });
};

const getTable = (resultCallback) => {
    conn.query("SELECT table_name as name FROM information_schema.tables where table_schema='geocercas'", (err, res) => {
        if (err) {
            resultCallback(err, null);
        }
        resultCallback(null, res);
    });
}

const getDetails = (nameTable) => {

    return new Promise((resolve, reject) => {

        conn.query(`SELECT *FROM ${nameTable} WHERE LOWER(singnal) <> 'gps' ORDER BY createtime`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });

    });


}

module.exports = {
    getCar,
    getTable,
    getDetails,
}