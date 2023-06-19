import Project from '../models/Project';
import Task from '../models/Task';
import Metric from '../models/Metric';
import Role from '../models/Role';
import userService from '../services/userService';

class ProjectController {
  async createProject(req, res) {
    try {
      const { name, description, members } = req.body;
      const project = await Project.create({ name, description, members });
      res.json({ project });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProject(req, res) {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      res.json({ project });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProject(req, res) {
    try {
      const { projectId } = req.params;
      const { name, description, members } = req.body;
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, description, members },
        { new: true }
      );
      res.json({ project: updatedProject });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const { projectId } = req.params;
      await Project.findByIdAndDelete(projectId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectMetrics(req, res) {
    try {
      const { projectId } = req.params;
      const metrics = await Metric.find({ project: projectId });
      res.json({ metrics });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async assignRoles(req, res) {
    try {
      const { projectId } = req.params;
      const { userIds, role } = req.body;
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const roleObject = await Role.findOne({ name: role });

      if (!roleObject) {
        return res.status(404).json({ error: 'Role not found' });
      }

      const updatedMembers = project.members.map((member) => {
        if (userIds.includes(member.user.toString())) {
          member.role = roleObject._id;
        }
        return member;
      });

      project.members = updatedMembers;
      await project.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addTask(req, res) {
    try {
      const { projectId } = req.params;
      const { name, description, assignedTo } = req.body;
      const task = await Task.create({ name, description, project: projectId, assignedTo });
      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const { name, description, assignedTo } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { name, description, assignedTo },
        { new: true }
      );
      res.json({ task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;
      await Task.findByIdAndDelete(taskId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new ProjectController();
