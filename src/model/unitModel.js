const { URL_NAVIXY, USER, PASSWORD } = require('../../config/config');
const axios = require('axios');

const getHash = () => {
    return new Promise((resolve, reject) => {
        axios(URL_NAVIXY + `user/auth?login=${USER}&password=${PASSWORD}`)
            .then(res => {
                if (res.data.success)
                    resolve(res.data);
                else
                    reject(res.data);
            })
            .catch(err => reject(err));
    });
}

const getUnits = (hash) => {
    return new Promise((resolve, reject) => {
        axios(URL_NAVIXY + `tracker/list/?hash=${hash}`)
            .then(res => {
                if (res.data.success)
                    resolve(res.data);
                else
                    reject(res.data);
            })
            .catch(err => reject(err));
    });
};

const getDataUnit = (hash, idCar) => {
    return new Promise((resolve, reject) => {
        axios(URL_NAVIXY + `tracker/get_state/?hash=${hash}&tracker_id=${idCar}`)
            .then(res => {
                if (res.data.success)
                    resolve(res.data);
                else
                    reject(res.data);
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    getUnits,
    getDataUnit,
    getHash
}