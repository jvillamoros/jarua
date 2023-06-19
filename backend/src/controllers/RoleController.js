import Role from '../models/Role';

class RoleController {
  async createRole(req, res) {
    try {
      const { name, permissions } = req.body;

      const role = new Role({
        name,
        permissions,
      });

      const savedRole = await role.save();

      res.json({ role: savedRole });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRole(req, res) {
    try {
      const { roleId } = req.params;

      const role = await Role.findById(roleId);

      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }

      res.json({ role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      const { roleId } = req.params;
      const { name, permissions } = req.body;

      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        { name, permissions },
        { new: true }
      );

      if (!updatedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }

      res.json({ role: updatedRole });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRole(req, res) {
    try {
      const { roleId } = req.params;

      const deletedRole = await Role.findByIdAndDelete(roleId);

      if (!deletedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new RoleController();
