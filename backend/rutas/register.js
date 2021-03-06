const router = require('express').Router();
const bcrypt = require('bcrypt');
let Usuario = require('../modelos/usuario.modelo');

router.route('/').post((req, res) => {  
  const body = req.body;
  const { nombre, email, password, role } = body;
  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });
  console.log('USuario' + nuevoUsuario);

  nuevoUsuario.save()
        .then(()=> res.json('Usuario aniadido exitosamente'))
        .catch(err => {
          console.log(err);
          res.status(400).json('ERRORSON: ' + err)
        });
  // usuario.save()
  //   .then((doc)=>{
  //     console.log(doc);
  //     res.json(doc);
  //   }).catch((err)=>{
  //     console.log(doc);
  //     res.json(err);
  //   });
// usuario.save((err, usuarioDB) => {
//     if (err) {
//       return res.status(400).json({
//          ok: false,
//          err,
//       });
//     }
//     res.json({
//           ok: true,
//           usuario: usuarioDB
//        });
//     })
// }
});

module.exports = router;