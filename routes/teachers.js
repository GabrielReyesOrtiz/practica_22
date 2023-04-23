//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('mongoose');
let Teacher = require('../models/teacher');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/teachers', function(req, res, next){
  Teacher.find(function (err, teachers) {
    if (err) return next(err);
    res.render('teacherIndex',{teachers});

  });
});
//Delete Person basicamente lo que haremos es borrar a una persona de nuestra base de datos
//con el ID que tiene cada documento en la coleccion podremso borrarlo
router.get('/deleteTeacher/:id', function(req, res, next){
  Teacher.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/teachers');
  });
});
//Update aqui vamos a encontrar el docuemnto a actualizar de la coleccion 
//usamos el id que tiene en mongodb atlas en cada documento
router.get('/findByIdT/:id', function(req, res, next){
  Teacher.findById(req.params.id, function (err, teacher) {
    if (err) return next(err);
    res.render('teacherUpdate', {teacher});
  });
});

//aqui viene la actualizacion de los datos seleccionados 
router.post('/updateTeacher', function(req, res, next){
 Teacher.findByIdAndUpdate(req.body.objId, {
    idT: req.body.idT,
    name: req.body.name,
    email: req.body.email,
    id_career: req.body.id_career}, function(err, post){
      if (err) return next(err);
      res.redirect('/teachers');
    });
  });




//Agregamos ruta por GET para renderizar la vista 
router.get('/main', function (req, res){
  res.render('main');
});
//Agregamos ruta por GET para renderizar la vista 
router.get('/teacher', function (req, res){
  res.render('teacher');
});
//Agregamos nueva ruta por POST para poder agregar un docuento nuevo a nuetsra coleccion


router.post('/addTeacher', function(req, res){
  // Validar que el campo idT sea un número de 8 dígitos
  const regexIdT = /^\d{8}$/;
  if (!regexIdT.test(req.body.idT)) {
    return res.status(400).send('El campo idT debe ser un número de 8 dígitos');
  }
// validar que tengamos un nombre o mas
  if (!req.body.name) {
    return res.status(400).send('El campo "name" es obligatorio');
  }

    // Validar que el campo id_career tenga exactamente dos apellidos
const regexIdCareer = /^(\S+ ){1}\S+$/;
if (!regexIdCareer.test(req.body.id_career)) {
  return res.status(400).send('El campo id_career debe tener exactamente dos apellidos');
}


// Validar que el campo grado y grupo tenga el formato correcto
const regexEmail = /^[1-8][A-K]$/;
if (!regexEmail.test(req.body.email)) {
  return res.status(400).send('El campo grado y grupo debe tener el formato correcto (ej. 2B) Los grados van de 1 a 8, y los grupos son de la A a la K');
}

let asistencia = 1; // Valor predeterminado de asistencia

const grado = parseInt(req.body.email.charAt(0)); // Obtener el número de grado como entero
const grupo = req.body.email.charAt(1); // Obtener la letra de grupo

if (grupo === 'G' && grado === 7) {
  asistencia = 0; // Si es del grupo 7G, asistencia es 0
} else {
  if (grupo === 'A' || grupo === 'B' || grupo === 'C') {
    asistencia *= 2; // Si es del grupo A, B, o C, asistencia se duplica
  }
  if (grado >= 4) {
    asistencia *= 3; // Si es del grado 4 o mayor, asistencia se triplica
  }
}


  // Crear una nueva instancia de "Teacher" con los datos del body
  const myTeacher = new Teacher({
    idT: req.body.idT,
    name: req.body.name,
    email: req.body.email,
    id_career: req.body.id_career,
    asistencia: asistencia
  });

  // Guardar la instancia en la base de datos
  myTeacher.save(function(err) {
    if (err) {
      return res.status(500).send('Error al guardar el registro en la base de datos');
    }
    res.redirect('/teachers');
  });
});

//Exportamos el router
module.exports=router;