const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// 1. Middlewares globales
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// 3. Rutas de la API (Primero que el resto)
app.use('/api/users', userRoutes);

// 4. Manejador de errores (DEBE ir después de las rutas de la API)
app.use(errorHandler);

// 5. El comodín de HTML (SIEMPRE AL FINAL)
// Reemplaza app.get('/*', ...) por esto:
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;