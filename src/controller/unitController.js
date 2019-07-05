const unitModel = require('../model/unitModel');

const unitData = () => {
    return new Promise((resolve, reject) => {

        let hash;
        let dataMap = [];

        // se consulta el hash
        unitModel.getHash()
            .then(res => {
                hash = res.hash;
                return unitModel.getUnits(hash);
            })
            // se consulta el listado de unidades
            .then(res => {
                const mapeo = async() => {

                    for (var u of res.list) {
                        // aqui se mandaria a llamar el servicio para obtener 
                        // el detalle de las unidades
                        let detail = await unitModel.getDataUnit(hash, u.id);

                        dataMap.push({
                            id: u.id,
                            model: u.source.model,
                            phone: u.source.phone,
                            updated: detail.state.gps.updated,
                            signal_level: detail.state.gps.signal_level,
                            heading: detail.state.gps.heading,
                            speed: detail.state.gps.speed,
                            alt: detail.state.gps.alt,
                            connection_status: detail.state.connection_status,
                            movement_status: detail.state.movement_status,
                            last_update: detail.state.last_update
                        });

                    }
                };

                mapeo()
                    .then(resMapeo => {

                        resolve(dataMap);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

// servicio 
const getDataUnit = (req, res, next) => {

    unitData()
        .then(ress => {
            res.status(200).json(ress);
        })
        .catch(err => console.log(err));
};

setInterval(() => {
    unitData()
        .then(ress => {
            console.log(ress);
        })
        .catch(err => console.log(err));
}, 7000);

module.exports = {
    getDataUnit
}