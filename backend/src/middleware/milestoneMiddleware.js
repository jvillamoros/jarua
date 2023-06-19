import Milestone from '../models/Milestone';

async function milestoneMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de hito en los parámetros de la solicitud
    const { milestoneId } = req.params;

    if (!milestoneId) {
      return res.status(400).json({ error: 'ID de hito no proporcionado' });
    }

    // Buscar el hito por su ID en la base de datos
    const milestone = await Milestone.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({ error: 'Hito no encontrado' });
    }

    // Adjuntar el hito encontrado al objeto de solicitud para que esté disponible en los controladores posteriores
    req.milestone = milestone;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default milestoneMiddleware;
