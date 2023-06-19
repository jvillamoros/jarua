import Report from '../models/Report';
import Project from '../models/Project';

class ReportController {
  async createReport(req, res) {
    try {
      const { projectId, title, content } = req.body;

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const report = new Report({
        projectId,
        title,
        content,
      });

      const savedReport = await report.save();

      // Agregar el informe al proyecto
      project.reports.push(savedReport);
      await project.save();

      res.json({ report: savedReport });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReport(req, res) {
    try {
      const { reportId } = req.params;

      const report = await Report.findById(reportId).populate('projectId');

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      res.json({ report });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateReport(req, res) {
    try {
      const { reportId } = req.params;
      const { title, content } = req.body;

      const updatedReport = await Report.findByIdAndUpdate(
        reportId,
        { title, content },
        { new: true }
      );

      if (!updatedReport) {
        return res.status(404).json({ error: 'Report not found' });
      }

      res.json({ report: updatedReport });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteReport(req, res) {
    try {
      const { reportId } = req.params;

      const deletedReport = await Report.findByIdAndDelete(reportId);

      if (!deletedReport) {
        return res.status(404).json({ error: 'Report not found' });
      }

      // Eliminar el informe del proyecto
      const project = await Project.findById(deletedReport.projectId);
      if (project) {
        project.reports.pull(reportId);
        await project.save();
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new ReportController();
