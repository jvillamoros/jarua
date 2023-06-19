import Report from '../models/Report';

async function reportMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de reporte en los parámetros de la solicitud
    const { reportId } = req.params;

    if (!reportId) {
      return res.status(400).json({ error: 'ID de reporte no proporcionado' });
    }

    // Buscar el reporte por su ID en la base de datos
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    // Adjuntar el reporte encontrado al objeto de solicitud para que esté disponible en los controladores posteriores
    req.report = report;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default reportMiddleware;
