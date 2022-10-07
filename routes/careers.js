//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('mongoose');
let Career = require('../models/career');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/careers', function(req, res, next){
  Career.find(function (err, careers) {
    if (err) return next(err);
    res.render('careerIndex',{careers});

  });
});

//Delete Person basicamente lo que haremos es borrar a una persona de nuestra base de datos
//con el ID que tiene cada documento en la coleccion podremso borrarlo
router.get('/deleteCareer/:id', function(req, res, next){
  Career.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/careers');
  });
});
//Update aqui vamos a encontrar el docuemnto a actualizar de la coleccion 
//usamos el id que tiene en mongodb atlas en cada documento
router.get('/findByIdC/:id', function(req, res, next){
  Career.findById(req.params.id, function (err, career) {
    if (err) return next(err);
    res.render('careerUpdate', {career});
  });
});

//aqui viene la actualizacion de los datos seleccionados 
router.post('/updateCareer', function(req, res, next){
 Career.findByIdAndUpdate(req.body.objId, {
    idC: req.body.idC,
    name: req.body.name,
    description: req.body.description}, function(err, post){
      if (err) return next(err);
      res.redirect('/careers');
    });
  });




//Agregamos ruta por GET para renderizar la vista 
router.get('/main', function (req, res){
  res.render('main');
});
//Agregamos ruta por GET para renderizar la vista 
router.get('/career', function (req, res){
  res.render('career');
});
//Agregamos nueva ruta por POST para poder agregar un docuento nuevo a nuetsra coleccion
router.post('/addCareer', function(req, res){
  //nueva instancia de "Person" que recibe valores del body
  const myCareer = new Career({
    idC: req.body.idC,
    name: req.body.name,
    description: req.body.description}); //Creamos la entidad 
    myCareer.save();//guardamos en BD
    res.redirect('/careers');//redireccionamos a la ruta de persons
    
});

//Exportamos el router
module.exports=router;