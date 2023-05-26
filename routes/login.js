const express = require('express');
const router = express.Router();
let User = require('../models/user');
// Aquí importa los modelos o cualquier otra dependencia que necesites


// Ruta para renderizar la vista del login
router.get('/login', (req, res) => {
  if (req.session.user) {
    // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
    res.redirect('/');
  } else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    res.render('loginUser', { error: null }); // Ajusta el nombre de la vista del login si es diferente
  }
 
});

router.get('/register', (req, res) => {
    res.render('registerUser', { error: null }); // Ajusta el nombre de la vista del login si es diferente
  });

router.get('/', function (req, res){
    res.render('main');
  });

// Agrega aquí más rutas y lógica relacionada con el login si es necesario

router.post('/ejectRegister',  (req, res) => {
    const { email, password, userType } = req.body;
    
    const user = new User({ email, password, userType });

    user.save(err =>{
        if(err) {
          res.render('registerUser', { error: 'ERROR AL REGISTRAR AL USUARIO' });
        } else {
            res.redirect('/login');
        }
    });
  
  });

  router.post('/ejectLogin', async (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.render('loginUser', { error: 'ERROR AL AUTENTICAR AL USUARIO' });
      } else if (!user) {
        res.render('loginUser', { error: 'EL USUARIO NO EXISTE' }); // Renderiza la vista 'login' con el mensaje de error
      } else {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.render('loginUser', { error: 'ERROR AL AUTENTICAR' });
          } else if (result) {
            req.session.user = user; // Almacena el usuario en la sesión
            res.redirect('/');
          } else {
            res.render('loginUser', { error: 'USUARIO Y/O CONTRASEÑA INCORRECTA' }); // Renderiza la vista 'login' con el mensaje de error
          }
        });
      }
    });
  });
  
  
  router.get('/logout', (req, res) => {
    req.session.user = false; // Restablece la sesión del usuario a false
    res.redirect('/'); // Redirige a la página principal
  });
  
module.exports = router;
