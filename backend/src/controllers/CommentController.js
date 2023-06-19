import Comment from '../models/Comment';

class CommentController {
  async createComment(req, res) {
    try {
      // Obtener los datos del comentario desde la solicitud
      const { content, userId, postId } = req.body;

      // Crear un nuevo objeto Comment
      const comment = new Comment({
        content,
        userId,
        postId
      });

      // Guardar el comentario en la base de datos
      const savedComment = await comment.save();

      res.json({ comment: savedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getComment(req, res) {
    try {
      const { commentId } = req.params;

      // Buscar el comentario por su ID en la base de datos
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json({ comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      // Actualizar los datos del comentario en la base de datos
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json({ comment: updatedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      // Eliminar el comentario por su ID de la base de datos
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new CommentController();
