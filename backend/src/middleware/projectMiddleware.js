import { findById } from '../models/Project';

async function projectMiddleware(req, res, next) {
  try {
    const { projectId } = req.params;

    // Verificar si el proyecto existe en la base de datos
    const project = await findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Pasar el proyecto al siguiente middleware
    req.project = project;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default projectMiddleware;
