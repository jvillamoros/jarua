import Channel from '../models/Channel';

class ChannelController {
  async createChannel(req, res) {
    try {
      // Obtener los datos del canal desde la solicitud
      const { name, description, members } = req.body;

      // Crear un nuevo objeto Channel
      const channel = new Channel({
        name,
        description,
        members
      });

      // Guardar el canal en la base de datos
      const savedChannel = await channel.save();

      res.json({ channel: savedChannel });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getChannel(req, res) {
    try {
      const { channelId } = req.params;

      // Buscar el canal por su ID en la base de datos
      const channel = await Channel.findById(channelId);

      if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
      }

      res.json({ channel });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateChannel(req, res) {
    try {
      const { channelId } = req.params;
      const { name, description, members } = req.body;

      // Actualizar los datos del canal en la base de datos
      const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        { name, description, members },
        { new: true }
      );

      if (!updatedChannel) {
        return res.status(404).json({ error: 'Channel not found' });
      }

      res.json({ channel: updatedChannel });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteChannel(req, res) {
    try {
      const { channelId } = req.params;

      // Eliminar el canal por su ID de la base de datos
      const deletedChannel = await Channel.findByIdAndDelete(channelId);

      if (!deletedChannel) {
        return res.status(404).json({ error: 'Channel not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new ChannelController();
