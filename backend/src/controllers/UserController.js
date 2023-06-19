import { create, findById, findByIdAndUpdate, findByIdAndDelete, find } from '../models/User';
import { getRoleByName } from '../services/roleService';

class UserController {
  async createUser(req, res) {
    try {
      const { name, email, role } = req.body;
      const userRole = await getRoleByName(role);
      const user = await create({ name, email, role: userRole });
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await findById(userId);
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { name, email, role } = req.body;
      const userRole = await getRoleByName(role);
      const updatedUser = await findByIdAndUpdate(userId, { name, email, role: userRole }, { new: true });
      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await findByIdAndDelete(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await find();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new UserController();
