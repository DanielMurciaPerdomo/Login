const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true, //Erased blanks 
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
    },
    rol: {
      type: String,
      enum: ['usuario','admin'],
      default: 'usuario'
    },
    password: { 
      type: String,
      required: true,
      minlength: 6,
      select: false //no se retorna en consultas
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

//We used function to got the 'this' on the methods
//Encriptar antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12); //salt rounds, or how difficult the password will be encrypt
});

//Comparar contraseñas
userSchema.methods.compararPassword = async function (ingresado) {
  return await bcrypt.compare(ingresado, this.password);
};

module.exports = mongoose.model('User', userSchema);