import Reminder from '../models/Reminder.js';

export const getReminders = async (req, res) => {
  try {
    const { date, pet, category } = req.query;
    const filter = {};

    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      filter.date = { $gte: selectedDate, $lt: nextDay };
    }

    if (pet && pet !== 'all') {
      filter.pet = pet;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    const reminders = await Reminder.find(filter);
    res.json(reminders);
  } catch (err) {
    console.error('Error fetching reminders:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createReminder = async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    console.error('Error creating reminder:', err.message);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating reminder:', err.message);
    res.status(500).json({ error: 'Failed to update reminder' });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findByIdAndDelete(id);
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting reminder:', err.message);
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
};
