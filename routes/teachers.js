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
  //nueva instancia de "Person" que recibe valores del body
  const myTeacher = new Teacher({
    idT: req.body.idT,
    name: req.body.name,
    email: req.body.email,
    id_career: req.body.id_career}); //Creamos la entidad 
    myTeacher.save();//guardamos en BD
    res.redirect('/teachers');//redireccionamos a la vista de personas
    
});

//Exportamos el router
module.exports=router;