import Meeting from '../models/Meeting';

async function meetingMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de reunión en los parámetros de la solicitud
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ error: 'ID de reunión no proporcionado' });
    }

    // Buscar la reunión por su ID en la base de datos
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ error: 'Reunión no encontrada' });
    }

    // Adjuntar la reunión encontrada al objeto de solicitud para que esté disponible en los controladores posteriores
    req.meeting = meeting;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default meetingMiddleware;
