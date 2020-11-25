const router = require('express').Router();
let Alumno = require('../modelos/alumno.modelo');
let Usuario = require('../modelos/usuario.modelo');

router.route('/').get((req, res)=>{
    Alumno.find()
        .then(alumnos => res.json(alumnos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/obtenerAlumnos').get((req, res)=>{
    const usuario = req.headers.authorization;

    try {
        Usuario.findById(usuario).populate('alumnos')
        .then( usuario =>{
            res.json(usuario.alumnos);
        })
        .catch(error=>{
            res.status(400).json('Error' + error);
            console.log(error);
        });
    } catch (err) {
        console.log('Error'+err);
    }
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

router.route('/eliminar').delete((req, res)=>{
    const usuario = req.body.usuario;
    const alumno = req.body.alumno;   
    try {
        Usuario.findById(usuario).populate('alumnos').exec((error, user)=>{
            if(user != undefined) {
                for(var i = 0; i < user.alumnos.length; i++){ 
                    if (user.alumnos[i]._id == alumno) { 
                        user.alumnos.splice(i, 1);
                        user.save(); 
                    }
                }
                Alumno.findByIdAndDelete(alumno)
                    .then(()=>res.json('Alumno eliminado correctamente'))
                    .catch(()=> res.json('No se pudo eliminar el alumno'));                
            }            
        });
    } catch (err) {
        console.log('Error'+err);
    }
});

router.route('/modificar').put((req, res)=>{
    const alumno = req.body.data.alumno;   
    const nombre = req.body.data.nombre;
    const email = req.body.data.email;
    try {
        Alumno.findByIdAndUpdate(alumno, {nombre:nombre, email:email}, {useFindAndModify:false, new:true}, (err, result)=>{
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    } catch (err) {
        console.log('Error'+err);
    }
});

module.exports = router;