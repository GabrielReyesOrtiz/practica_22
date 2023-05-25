const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { route } = require('../routes/subjects');


const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Estudiante', 'Profesor'] }
  });

// Antes de guardar, hashea la contraseña
UserSchema.pre('save', function(next) {
  if(this.isNew || this.isModified('password')){
    const document = this;

    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
        if(err) {
            next(err);
        } else {
            document.password = hashedPassword;
            next();
        }
    });
  } else {
    next();
  }
});

// Método para comparar contraseñas
UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if(err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
