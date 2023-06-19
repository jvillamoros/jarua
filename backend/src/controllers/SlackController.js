import { sendMessage as _sendMessage, getChannels as _getChannels, getChannelMessages as _getChannelMessages, sendDirectMessage as _sendDirectMessage, uploadFile as _uploadFile, getUserInfo as _getUserInfo } from '../services/slackService';

class SlackController {
  async sendMessage(req, res) {
    try {
      const { channel, message } = req.body;
      await _sendMessage(channel, message);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getChannels(req, res) {
    try {
      const channels = await _getChannels();
      res.json({ channels });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getChannelMessages(req, res) {
    try {
      const { channel } = req.params;
      const messages = await _getChannelMessages(channel);
      res.json({ messages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendDirectMessage(req, res) {
    try {
      const { user, message } = req.body;
      await _sendDirectMessage(user, message);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async uploadFile(req, res) {
    try {
      const { channel, filePath } = req.body;
      await _uploadFile(channel, filePath);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserInfo(req, res) {
    try {
      const { userId } = req.params;
      const userInfo = await _getUserInfo(userId);
      res.json({ userInfo });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones según tus necesidades, como obtener la lista de usuarios, crear canales, obtener información detallada de un mensaje, entre otros.
}

export default new SlackController();
