import { findById } from '../models/Task';

async function taskMiddleware(req, res, next) {
  try {
    const { taskId } = req.params;

    // Verificar si la tarea existe en la base de datos
    const task = await findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Pasar la tarea al siguiente middleware
    req.task = task;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default taskMiddleware;
