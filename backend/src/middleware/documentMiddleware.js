import Document from '../models/Document';

async function documentMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de documento en los parámetros de la solicitud
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(400).json({ error: 'ID de documento no proporcionado' });
    }

    // Buscar el documento por su ID en la base de datos
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    // Adjuntar el documento encontrado al objeto de solicitud para que esté disponible en los controladores posteriores
    req.document = document;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default documentMiddleware;
