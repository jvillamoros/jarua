const knowledgeManagementService = require('../services/knowledgeManagementService');

class KnowledgeManagementController {
  async addExperience(req, res) {
    try {
      const { userId, taskId, experience } = req.body;
      await knowledgeManagementService.addExperience(userId, taskId, experience);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExperiences(req, res) {
    try {
      const { userId } = req.params;
      const experiences = await knowledgeManagementService.getExperiences(userId);
      res.json({ experiences });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateExperience(req, res) {
    try {
      const { experienceId } = req.params;
      const { experience } = req.body;
      await knowledgeManagementService.updateExperience(experienceId, experience);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExperience(req, res) {
    try {
      const { experienceId } = req.params;
      await knowledgeManagementService.deleteExperience(experienceId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador para gestionar la gestión del conocimiento, como obtener experiencias por tarea, filtrar por rol, etc.
}

module.exports = new KnowledgeManagementController();
