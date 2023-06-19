import { registerUser as _registerUser, loginUser as _loginUser } from '../services/authService';

class AuthController {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await _registerUser(name, email, password);
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await _loginUser(email, password);
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async logoutUser(req, res) {
    try {
      // Código para cerrar la sesión del usuario
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      // Código para enviar un correo de recuperación de contraseña
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      // Código para restablecer la contraseña del usuario
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
