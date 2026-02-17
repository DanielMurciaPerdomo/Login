const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
    },
    edad: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

module.exports = mongoose.model('User', userSchema);