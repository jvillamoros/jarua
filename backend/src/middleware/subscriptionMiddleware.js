import Subscription from '../models/Subscription';

async function subscriptionMiddleware(req, res, next) {
  try {
    // Verificar si se proporciona un ID de suscripción en los parámetros de la solicitud
    const { subscriptionId } = req.params;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'ID de suscripción no proporcionado' });
    }

    // Buscar la suscripción por su ID en la base de datos
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }

    // Adjuntar la suscripción encontrada al objeto de solicitud para que esté disponible en los controladores posteriores
    req.subscription = subscription;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default subscriptionMiddleware;
