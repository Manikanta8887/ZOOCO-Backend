import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  title: String,
  notes: String,
  pet: String,
  category: String,
  date: Date,
  frequency: String,
  status: { type: String, default: 'pending' },
});

export default mongoose.model('Reminder', reminderSchema);
