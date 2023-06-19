import Milestone from '../models/MileStone';
import Project from '../models/Project';

class MilestoneController {
  async createMilestone(req, res) {
    try {
      const { projectId, name, description, dueDate } = req.body;

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const milestone = new Milestone({
        projectId,
        name,
        description,
        dueDate,
      });

      const savedMilestone = await milestone.save();

      // Agregar el hito al proyecto
      project.milestones.push(savedMilestone);
      await project.save();

      res.json({ milestone: savedMilestone });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMilestone(req, res) {
    try {
      const { milestoneId } = req.params;

      const milestone = await Milestone.findById(milestoneId).populate('projectId');

      if (!milestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }

      res.json({ milestone });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMilestone(req, res) {
    try {
      const { milestoneId } = req.params;
      const { name, description, dueDate } = req.body;

      const updatedMilestone = await Milestone.findByIdAndUpdate(
        milestoneId,
        { name, description, dueDate },
        { new: true }
      );

      if (!updatedMilestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }

      res.json({ milestone: updatedMilestone });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMilestone(req, res) {
    try {
      const { milestoneId } = req.params;

      const deletedMilestone = await Milestone.findByIdAndDelete(milestoneId);

      if (!deletedMilestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }

      // Eliminar el hito del proyecto
      const project = await Project.findById(deletedMilestone.projectId);
      if (project) {
        project.milestones.pull(milestoneId);
        await project.save();
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new MilestoneController();
