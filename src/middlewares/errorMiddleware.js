
const errorHandler = (err, req, res, next) => {
    // Si el error viene de Mongoose (validación), forzamos un 400
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };