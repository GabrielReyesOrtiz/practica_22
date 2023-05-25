//Inyectamos las dependencias express, mongoose, person
const express = require('express');
//Generamos la instancia de router
const router = express.Router();
const mongoose = require('mongoose');
let Teacher = require('../models/teacher');
//Iteramos persons por personsIndex para que le de formato de tabla.
router.get('/teachers', function(req, res, next){
  if (req.session.user) {
    // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
    const user = req.session.user;
    Teacher.find(function (err, teachers) {
      if (err) return next(err);
      res.render('teacherIndex',{teachers, user});
    });
  } else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    res.redirect('/');
  }

  
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


  router.get('/searchTeacher', function(req, res, next) {
    if (req.session.user) {
      // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
      const searchTerm = req.query.search; // Obtener el término de búsqueda de la consulta
  
    // Construir la consulta de búsqueda
    const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};
  
    // Realizar la búsqueda en la base de datos
    Teacher.find(query, function(err, teachers) {
      if (err) return next(err);
      res.render('teacherIndex', { teachers, user: req.session.user });
    });
    } else {
      // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
      res.redirect('/');
    }
    
  });

//Agregamos ruta por GET para renderizar la vista 
router.get('/teacher', function (req, res){
  if (req.session.user) {
    // El usuario ha iniciado sesión, puedes acceder a los datos de sesión
    if (req.session.user.userType === 'Profesor') {
      // El usuario es un profesor, permitir el acceso a la ruta '/career'
      res.render('teacher');
    } else {
      // El usuario no es un profesor, redirige a una página de error o muestra un mensaje adecuado
      res.redirect('/');
    }
    
  } else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    res.redirect('/');
  }

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