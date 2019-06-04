const gpsModel = require('../model/gpsModel');

const find = (key, array) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name.replace('ct', '') === key) {
            return array[i];
        }
    }
}

const getGPSEvents = (req, res, next) => {


    if (!req.query.User || !req.query.Password) {
        res.status(401).send('Es necesario enviar usuario y password');
        return;
    }

    if (req.query.User !== 'promtec') {
        res.status(401).send('Login incorrecto');
        return;
    }

    if (req.query.Password !== 'Tempo1*') {
        res.status(401).send('Login incorrecto');
        return;
    }

    // se llama a tabla car
    gpsModel.getCar((err, resCar) => {

        let resGPS = [];

        let tables = [];

        if (err) {
            res.status(500).send(err);
        }

        let car = resCar;
        // se obtiene los nombre de las tablas
        gpsModel.getTable((err, resTable) => {
            if (err) {
                res.status(500).send(err);
            }
            for (let c of car) {
                let table = find(c.imeino, resTable);

                if (table) {
                    tables.push({
                        name: table.name,
                        imeino: c.imeino,
                        plate: c.plate,
                    });
                }
            }


            const mapeo = async() => {

                for (const t of tables) {
                    let resDetails = await gpsModel.getDetails(t.name);
                    resDetails.map((d) => {

                        var date = new Date(d.createtime);
                        var month = (date.getMonth() + 1);
                        var day = date.getDate();

                        var obj = {
                            IMEI: t.imeino,
                            EventType: d.engine === 0 ? 2 : 6,
                            DTime: date.getFullYear() + '/' + ((month => 10) ? ('0' + month) : month) + '/' + ((day => 10) ? ('0' + day) : day) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                            Lat: parseFloat(d.latitude),
                            Lon: parseFloat(d.longitude),
                            Speed: Math.round(parseFloat(d.speed)),
                            Adress: d.address,
                            Plate: t.plate,
                            Alias: t.plate,
                            Course: ''
                        };
                        resGPS.push(obj);
                    });

                };

            }

            mapeo().then(r => {
                res.status(200).json(resGPS);
            }).catch(err => {
                res.status(500).send(err);
            });

        });

    });


};

module.exports = {
    getGPSEvents
}