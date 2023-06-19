import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Team = model('Team', teamSchema);

export default Team;
