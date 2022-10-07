//Aqui estamos inyectando la dependencia en mongoose
const mongoose = require('mongoose');
//Instanciamos  Schema de Mongoose que coincida con la coleccion de MongoDB Atlas
let TeacherSchema = new mongoose.Schema({
  idT:Number,
  name: String,
  email: String,
  id_career: Number

});
//Exponemos instancia de modelos mongoose 
module.exports = mongoose.model('teacher', TeacherSchema);