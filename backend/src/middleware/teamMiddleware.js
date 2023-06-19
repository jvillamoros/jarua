import Team from '../models/Team';

async function teamMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de equipo en los parámetros de la solicitud
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ error: 'ID de equipo no proporcionado' });
    }

    // Buscar el equipo por su ID en la base de datos
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    // Adjuntar el equipo encontrado al objeto de solicitud para que esté disponible en los controladores posteriores
    req.team = team;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default teamMiddleware;
