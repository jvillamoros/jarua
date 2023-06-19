import { Schema, model } from 'mongoose';

const milestoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

const Milestone = model('Milestone', milestoneSchema);

export default Milestone;
