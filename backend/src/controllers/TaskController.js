import Task from '../models/Task';

class TaskController {
  async createTask(req, res) {
    try {
      const { projectId, name, description } = req.body;

      const task = new Task({
        projectId,
        name,
        description,
      });

      const savedTask = await task.save();

      res.json({ task: savedTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTask(req, res) {
    try {
      const { taskId } = req.params;

      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const { name, description } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { name, description },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;

      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new TaskController();
