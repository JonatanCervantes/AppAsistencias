const router = require('express').Router();
let Asistencia = require('../modelos/asistencia.modelo');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Asistencia.find()
        .then(asistencias => res.json(asistencias))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const fecha = req.body.fecha;
    const idCurso = req.body.idCurso;
    const registro = req.body.registro;
    console.log(registro);

    const nuevaAsistencia = new Asistencia({ fecha, idCurso, registro });
    nuevaAsistencia.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/obtenerAsistencias').get((req, res) => {
    const curso = req.headers.authorization;
    let arregloCursos = JSON.parse(curso);
    try {
        Asistencia.find({
            'idCurso': {
                $in: arregloCursos
            }
        }).then((documents) => {
            console.log(documents);
            res.json(documents);
        }).catch((error) => {
            res.status(400).json('Error' + error);
        });
    } catch (err) {
        console.log(err);
        console.log('Error' + err);
    }
});

router.route('/modificar').put((req, res) => {
    const asistencia = req.body.data.asistencia;
    const registro = req.body.data.registro;

    try {
        Asistencia.findByIdAndUpdate(asistencia, { registro: registro }, { useFindAndModify: false, new: true }, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    } catch (err) {
        console.log('Error' + err);
    }
});

module.exports = router;