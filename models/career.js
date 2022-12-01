//Aqui estamos inyectando la dependencia en mongoose
const mongoose = require('mongoose');
//Instanciamos  Schema de Mongoose que coincida con la coleccion de MongoDB Atlas
let CareerSchema = new mongoose.Schema({
  idC:Number,
  name: String,
  description: String
  

});
//Exponemos instancia de modelos mongoose 
module.exports = mongoose.model('career', CareerSchema);