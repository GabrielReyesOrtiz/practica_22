//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('mongoose');
let Subject = require('../models/subject');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/subjects', function(req, res, next){
  Subject.find(function (err, subjects) {
    if (err) return next(err);
    res.render('subjectIndex',{subjects});

  });
});
//Delete Person basicamente lo que haremos es borrar a una persona de nuestra base de datos
//con el ID que tiene cada documento en la coleccion podremso borrarlo
router.get('/deleteSubject/:id', function(req, res, next){
  Subject.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/subjects');
  });
});
//Update aqui vamos a encontrar el docuemnto a actualizar de la coleccion 
//usamos el id que tiene en mongodb atlas en cada documento
router.get('/findById/:id', function(req, res, next){
  Subject.findById(req.params.id, function (err, subject) {
    if (err) return next(err);
    res.render('subjectUpdate', {subject});
  });
});

//aqui viene la actualizacion de los datos seleccionados 
router.post('/updateSubject', function(req, res, next){
 Subject.findByIdAndUpdate(req.body.objId, {
    idS: req.body.idS,
    name: req.body.name,
    description: req.body.description,
    id_teacher: req.body.id_teacher}, function(err, post){
      if (err) return next(err);
      res.redirect('/subjects');
    });
  });




//Agregamos ruta por GET para renderizar la vista 
router.get('/main', function (req, res){
  res.render('main');
});
//Agregamos ruta por GET para renderizar la vista 
router.get('/subject', function (req, res){
  res.render('subject');
});
//Agregamos nueva ruta por POST para poder agregar un docuento nuevo a nuetsra coleccion
router.post('/addSubject', function(req, res){
  //nueva instancia de "Person" que recibe valores del body
  const mySubject = new Subject({
    idS: req.body.idS,
    name: req.body.name,
    description: req.body.description,
    id_teacher: req.body.id_teacher}); //Creamos la entidad 
    mySubject.save();//guardamos en BD
    res.redirect('/subjects');
    
});

//Exportamos el router
module.exports=router;