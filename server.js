//Inyectamos las 3 dependencias que necesitamos aqui mongoose express y persons
const mongoose = require('mongoose');
const express = require('express');
const personsRoutes=require('./routes/persons');

//Creamos ahora app de express
mongoose.Promise = global.Promise;
const app = express();
// Ahora configuramos view engine, agregamos router y el urlencoded
app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended: false} ));
app.use(personsRoutes);
//conexion a nuestra base de datos
mongoose.connect(
  'mongodb+srv://greyes17:Soysoyucol15@cluster0.ivf9j.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Ahora toca  levantar nuestro server
app.listen(3000);