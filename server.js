//Inyectamos las 3 dependencias que necesitamos aqui mongoose express y persons
const mongoose = require('mongoose');
const express = require('express');
const subjectsRoutes=require('./routes/subjects');
const careersRoutes=require('./routes/careers');
const teachersRoutes=require('./routes/teachers');
const loginRoutes=require('./routes/login');
const session = require('express-session');




//Creamos ahora app de express
mongoose.Promise = global.Promise;
const app = express();

app.use(session({
  secret: 'secreto', // Cambia esto por una cadena aleatoria más segura
  resave: false,
  saveUninitialized: false
}));

// Ahora configuramos view engine, agregamos router y el urlencoded
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
  res.render("main", { user: req.session.user });
});

app.use(express.urlencoded( {extended: false} ));
app.use(subjectsRoutes);
app.use(careersRoutes);
app.use(loginRoutes);
app.use(teachersRoutes);
app.use(express.static('public'));
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