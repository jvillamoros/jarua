const calendarService = require('../services/calendarService');

class CalendarController {
  async getEvents(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const events = await calendarService.getEvents(startDate, endDate);
      res.json({ events });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEvent(req, res) {
    try {
      const { title, description, start, end } = req.body;
      const event = await calendarService.createEvent(title, description, start, end);
      res.json({ event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { title, description, start, end } = req.body;
      const event = await calendarService.updateEvent(eventId, title, description, start, end);
      res.json({ event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
      await calendarService.deleteEvent(eventId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CalendarController();
