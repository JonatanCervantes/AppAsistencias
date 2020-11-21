const router = require('express').Router();
let Alumno = require('../modelos/alumno.modelo');

router.route('/').get((req, res)=>{
    Alumno.find()
        .then(alumnos => res.json(alumnos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const nombre = req.body.nombre;
    const email = req.body.email;
    
    const nuevoAlumno = new Alumno({nombre, email});
    nuevoAlumno.save()
        .then(doc => {
            res.json(doc);            
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;