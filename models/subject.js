//Aqui estamos inyectando la dependencia en mongoose
const mongoose = require('mongoose');
//Instanciamos  Schema de Mongoose que coincida con la coleccion de MongoDB Atlas
let SubjectSchema = new mongoose.Schema({
  idS:Number,
  name: String,
  description: String,
  id_teacher: String

});
//Exponemos instancia de modelos mongoose 
module.exports = mongoose.model('test', SubjectSchema);
