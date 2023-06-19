import Document from '../models/Document';
import Project from '../models/Project';
import KnowledgeManagementController from './knowledgeManagementController';

class DocumentController {
  async createDocument(req, res) {
    try {
      const { projectId, title, content } = req.body;

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const document = new Document({
        title,
        content,
        projectId,
      });

      const savedDocument = await document.save();

      // Agregar el documento al proyecto
      project.documents.push(savedDocument);
      await project.save();

      // Agregar el documento al controlador de gestión del conocimiento
      KnowledgeManagementController.addDocument(savedDocument);

      res.json({ document: savedDocument });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocument(req, res) {
    try {
      const { documentId } = req.params;

      const document = await Document.findById(documentId).populate('projectId');

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json({ document });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { title, content } = req.body;

      const updatedDocument = await Document.findByIdAndUpdate(
        documentId,
        { title, content },
        { new: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json({ document: updatedDocument });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req, res) {
    try {
      const { documentId } = req.params;

      const deletedDocument = await Document.findByIdAndDelete(documentId);

      if (!deletedDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }

      // Eliminar el documento del proyecto
      const project = await Project.findById(deletedDocument.projectId);
      if (project) {
        project.documents.pull(documentId);
        await project.save();
      }

      // Eliminar el documento del controlador de gestión del conocimiento
      KnowledgeManagementController.removeDocument(deletedDocument);

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new DocumentController();
