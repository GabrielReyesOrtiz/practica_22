//Aqui estamos inyectando la dependencia en mongoose
const mongoose = require('mongoose');
//Instanciamos  Schema de Mongoose que coincida con la coleccion de MongoDB Atlas
let PersonSchema = new mongoose.Schema({
  nombre: String,
  edad:Number,
  tipoSangre: String,
  nss: String

});
//Exponemos instancia de modelos mongoose 
module.exports = mongoose.model('test', PersonSchema);
