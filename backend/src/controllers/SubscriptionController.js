import Subscription from '../models/Subscription';

class SubscriptionController {
  async createSubscription(req, res) {
    try {
      const { userId, planId, startDate, endDate } = req.body;

      const subscription = new Subscription({
        userId,
        planId,
        startDate,
        endDate,
      });

      const savedSubscription = await subscription.save();

      res.json({ subscription: savedSubscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSubscription(req, res) {
    try {
      const { subscriptionId } = req.params;

      const subscription = await Subscription.findById(subscriptionId);

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      res.json({ subscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSubscription(req, res) {
    try {
      const { subscriptionId } = req.params;
      const { userId, planId, startDate, endDate } = req.body;

      const updatedSubscription = await Subscription.findByIdAndUpdate(
        subscriptionId,
        { userId, planId, startDate, endDate },
        { new: true }
      );

      if (!updatedSubscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      res.json({ subscription: updatedSubscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSubscription(req, res) {
    try {
      const { subscriptionId } = req.params;

      const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);

      if (!deletedSubscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agrega otras funciones del controlador según sea necesario
}

export default new SubscriptionController();
