import Team from '../models/Team';

class TeamController {
  async createTeam(req, res) {
    try {
      const { name, description } = req.body;

      const team = new Team({
        name,
        description,
      });

      const savedTeam = await team.save();

      res.json({ team: savedTeam });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTeam(req, res) {
    try {
      const { teamId } = req.params;

      const team = await Team.findById(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.json({ team });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTeam(req, res) {
    try {
      const { teamId } = req.params;
      const { name, description } = req.body;

      const updatedTeam = await Team.findByIdAndUpdate(
        teamId,
        { name, description },
        { new: true }
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.json({ team: updatedTeam });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTeam(req, res) {
    try {
      const { teamId } = req.params;

      const deletedTeam = await Team.findByIdAndDelete(teamId);

      if (!deletedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new TeamController();
