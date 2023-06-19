function errorMiddleware(err, req, res, next) {
    // Loguear el error para propósitos de debugging
    console.error(err);
  
    // Verificar si el error tiene un código de estado definido
    const statusCode = err.statusCode || 500;
  
    // Enviar una respuesta de error al cliente
    res.status(statusCode).json({
      error: {
        message: err.message || 'Ocurrió un error en el servidor',
      },
    });
  }
  
  export default errorMiddleware;
  