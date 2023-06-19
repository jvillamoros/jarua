function userMiddleware(req, res, next) {
    // Aquí puedes realizar las acciones que necesites con los datos del usuario
    // Puedes acceder a la información del usuario a través de req.user
  
    // Ejemplo de verificación de autenticación
    if (!req.user) {
      return res.status(401).json({ error: 'No estás autenticado' });
    }
  
    // Ejemplo de validación de roles de usuario
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos suficientes' });
    }
  
    // Si todo está correcto, puedes llamar a next() para pasar al siguiente middleware o controlador
    next();
  }
  
  export default userMiddleware;
  