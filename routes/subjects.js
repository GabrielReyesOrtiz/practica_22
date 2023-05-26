//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('mongoose');
let Subject = require('../models/subject');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/subjects', function(req, res, next){

  if (req.session.user) {
    // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
    const user = req.session.user;
    Subject.find(function (err, subjects) {
      if (err) return next(err);
      res.render('subjectIndex',{subjects, user});
  
    });
  } else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    res.redirect('/');
  }

  Subject.find(function (err, subjects) {
    if (err) return next(err);
    res.render('subjectIndex',{subjects, user: req.session.user});

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


  router.get('/searchSubject', function(req, res, next) {
    if (req.session.user) {
      // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
      const searchTerm = req.query.search; // Obtener el término de búsqueda de la consulta
  
      // Construir la consulta de búsqueda
      const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};
    
      // Realizar la búsqueda en la base de datos
      Subject.find(query, function(err, subjects) {
        if (err) return next(err);
        res.render('subjectIndex', { subjects, user: req.session.user });
      });
    } else {
      // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
      res.redirect('/');
    }
   
  });

//Agregamos ruta por GET para renderizar la vista 
/*router.get('/main', function (req, res){
  res.render('main');
});*/
//Agregamos ruta por GET para renderizar la vista 
router.get('/subject', function (req, res){
  if (req.session.user) {
    if (req.session.user.userType === 'Profesor') {
      // El usuario es un profesor, permitir el acceso a la ruta '/career'
      res.render('subject');
    } else {
      // El usuario no es un profesor, redirige a una página de error o muestra un mensaje adecuado
      res.redirect('/');
    }
    // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
    
  } else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    res.redirect('/');
  }
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