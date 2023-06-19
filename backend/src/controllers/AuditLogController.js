import AuditLog from '../models/AuditLog';

class AuditLogController {
  async createAuditLog(req, res) {
    try {
      // Obtener la información del registro de auditoría desde la solicitud
      const { action, userId, details } = req.body;

      // Crear un nuevo objeto AuditLog
      const auditLog = new AuditLog({
        action,
        userId,
        details
      });

      // Guardar el objeto AuditLog en la base de datos
      const savedAuditLog = await auditLog.save();

      res.json({ auditLog: savedAuditLog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAuditLog(req, res) {
    try {
      const { auditLogId } = req.params;

      // Buscar el registro de auditoría por su ID en la base de datos
      const auditLog = await AuditLog.findById(auditLogId);

      if (!auditLog) {
        return res.status(404).json({ error: 'Audit log not found' });
      }

      res.json({ auditLog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAuditLog(req, res) {
    try {
      const { auditLogId } = req.params;

      // Eliminar el registro de auditoría por su ID de la base de datos
      const deletedAuditLog = await AuditLog.findByIdAndDelete(auditLogId);

      if (!deletedAuditLog) {
        return res.status(404).json({ error: 'Audit log not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new AuditLogController();
