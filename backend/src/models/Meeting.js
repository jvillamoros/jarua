import { Schema, model } from 'mongoose';

const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: String,
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  description: String,
});

const Meeting = model('Meeting', meetingSchema);

export default Meeting;
