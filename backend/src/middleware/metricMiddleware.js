import Metric from '../models/Metric';

async function metricMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de métrica en los parámetros de la solicitud
    const { metricId } = req.params;

    if (!metricId) {
      return res.status(400).json({ error: 'ID de métrica no proporcionado' });
    }

    // Buscar la métrica por su ID en la base de datos
    const metric = await Metric.findById(metricId);

    if (!metric) {
      return res.status(404).json({ error: 'Métrica no encontrada' });
    }

    // Adjuntar la métrica encontrada al objeto de solicitud para que esté disponible en los controladores posteriores
    req.metric = metric;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default metricMiddleware;
