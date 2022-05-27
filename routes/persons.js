//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('../node_modules/mongoose');
let Person = require('../models/person');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/persons', function(req, res, next){
  Person.find(function (err, persons) {
    if (err) return next(err);
    res.render('personsIndex',{persons});

  });
});
//Delete Person basicamente lo que haremos es borrar a una persona de nuestra base de datos
//con el ID que tiene cada documento en la coleccion podremso borrarlo
router.get('/deletePerson/:id', function(req, res, next){
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/persons');
  });
});
//Update aqui vamos a encontrar el docuemnto a actualizar de la coleccion 
//usamos el id que tiene en mongodb atlas en cada documento
router.get('/findById/:id', function(req, res, next){
  Person.findById(req.params.id, function (err, person) {
    if (err) return next(err);
    res.render('personUpdate', {person});
  });
});

//aqui viene la actualizacion de los datos seleccionados 
router.post('/updatePerson', function(req, res, next){
 Person.findByIdAndUpdate(req.body.objId, {
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss}, function(err, post){
      if (err) return next(err);
      res.redirect('/persons');
    });
  });




//Agregamos ruta por GET para renderizar la vista 
router.get('/main', function (req, res){
  res.render('main');
});
//Agregamos ruta por GET para renderizar la vista 
router.get('/person', function (req, res){
  res.render('person');
});
//Agregamos nueva ruta por POST para poder agregar un docuento nuevo a nuetsra coleccion
router.post('/addPerson', function(req, res){
  //nueva instancia de "Person" que recibe valores del body
  const myPerson = new Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss}); //Creamos la entidad 
    myPerson.save();//guardamos en BD
});

//Exportamos el router
module.exports=router;