import Metric from '../models/Metric';
import Project from '../models/Project';

class MetricController {
  async createMetric(req, res) {
    try {
      const { projectId, name, value } = req.body;

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const metric = new Metric({
        projectId,
        name,
        value,
      });

      const savedMetric = await metric.save();

      // Agregar la métrica al proyecto
      project.metrics.push(savedMetric);
      await project.save();

      res.json({ metric: savedMetric });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMetric(req, res) {
    try {
      const { metricId } = req.params;

      const metric = await Metric.findById(metricId).populate('projectId');

      if (!metric) {
        return res.status(404).json({ error: 'Metric not found' });
      }

      res.json({ metric });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMetric(req, res) {
    try {
      const { metricId } = req.params;
      const { name, value } = req.body;

      const updatedMetric = await Metric.findByIdAndUpdate(
        metricId,
        { name, value },
        { new: true }
      );

      if (!updatedMetric) {
        return res.status(404).json({ error: 'Metric not found' });
      }

      res.json({ metric: updatedMetric });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMetric(req, res) {
    try {
      const { metricId } = req.params;

      const deletedMetric = await Metric.findByIdAndDelete(metricId);

      if (!deletedMetric) {
        return res.status(404).json({ error: 'Metric not found' });
      }

      // Eliminar la métrica del proyecto
      const project = await Project.findById(deletedMetric.projectId);
      if (project) {
        project.metrics.pull(metricId);
        await project.save();
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new MetricController();
