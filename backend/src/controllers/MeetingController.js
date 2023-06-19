import Meeting from '../models/Meeting';
import Project from '../models/Project';

class MeetingController {
  async createMeeting(req, res) {
    try {
      const { projectId, title, description, date, attendees } = req.body;

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const meeting = new Meeting({
        projectId,
        title,
        description,
        date,
        attendees,
      });

      const savedMeeting = await meeting.save();

      // Agregar la reunión al proyecto
      project.meetings.push(savedMeeting);
      await project.save();

      res.json({ meeting: savedMeeting });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMeeting(req, res) {
    try {
      const { meetingId } = req.params;

      const meeting = await Meeting.findById(meetingId).populate('projectId');

      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      res.json({ meeting });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMeeting(req, res) {
    try {
      const { meetingId } = req.params;
      const { title, description, date, attendees } = req.body;

      const updatedMeeting = await Meeting.findByIdAndUpdate(
        meetingId,
        { title, description, date, attendees },
        { new: true }
      );

      if (!updatedMeeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      res.json({ meeting: updatedMeeting });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMeeting(req, res) {
    try {
      const { meetingId } = req.params;

      const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

      if (!deletedMeeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      // Eliminar la reunión del proyecto
      const project = await Project.findById(deletedMeeting.projectId);
      if (project) {
        project.meetings.pull(meetingId);
        await project.save();
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new MeetingController();
