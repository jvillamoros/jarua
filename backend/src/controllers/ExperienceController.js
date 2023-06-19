import Experience from '../models/Experience';

class ExperienceController {
  async createExperience(req, res) {
    try {
      // Obtener los datos de la experiencia desde la solicitud
      const { title, description, userId } = req.body;

      // Crear un nuevo objeto Experience
      const experience = new Experience({
        title,
        description,
        userId
      });

      // Guardar la experiencia en la base de datos
      const savedExperience = await experience.save();

      res.json({ experience: savedExperience });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExperience(req, res) {
    try {
      const { experienceId } = req.params;

      // Buscar la experiencia por su ID en la base de datos
      const experience = await Experience.findById(experienceId);

      if (!experience) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.json({ experience });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateExperience(req, res) {
    try {
      const { experienceId } = req.params;
      const { title, description } = req.body;

      // Actualizar los datos de la experiencia en la base de datos
      const updatedExperience = await Experience.findByIdAndUpdate(
        experienceId,
        { title, description },
        { new: true }
      );

      if (!updatedExperience) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.json({ experience: updatedExperience });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExperience(req, res) {
    try {
      const { experienceId } = req.params;

      // Eliminar la experiencia por su ID de la base de datos
      const deletedExperience = await Experience.findByIdAndDelete(experienceId);

      if (!deletedExperience) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new ExperienceController();
