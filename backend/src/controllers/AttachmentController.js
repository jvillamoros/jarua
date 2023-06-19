import Attachment from '../models/Attachment';

class AttachmentController {
  async createAttachment(req, res) {
    try {
      // Obtener la información del archivo adjunto desde la solicitud
      const { originalname, mimetype, size, path } = req.file;

      // Crear un nuevo objeto Attachment
      const attachment = new Attachment({
        filename: originalname,
        mimetype,
        size,
        path
      });

      // Guardar el objeto Attachment en la base de datos
      const savedAttachment = await attachment.save();

      res.json({ attachment: savedAttachment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAttachment(req, res) {
    try {
      const { attachmentId } = req.params;

      // Buscar el archivo adjunto por su ID en la base de datos
      const attachment = await Attachment.findById(attachmentId);

      if (!attachment) {
        return res.status(404).json({ error: 'Attachment not found' });
      }

      res.json({ attachment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAttachment(req, res) {
    try {
      const { attachmentId } = req.params;

      // Eliminar el archivo adjunto por su ID de la base de datos
      const deletedAttachment = await Attachment.findByIdAndDelete(attachmentId);

      if (!deletedAttachment) {
        return res.status(404).json({ error: 'Attachment not found' });
      }

      // Eliminar el archivo físico del sistema de archivos
      // Aquí puedes utilizar librerías como fs-extra o rimraf para eliminar archivos

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new AttachmentController();
