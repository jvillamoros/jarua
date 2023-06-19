import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  label: {
    type: Schema.Types.ObjectId,
    ref: 'Label',
  },
  status: {
    type: String,
    enum: ['Todo', 'Blocked', 'In Progress', 'Ready for QA', 'Canceled', 'Duplicate', 'Completed'],
    default: 'Todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = model('Task', taskSchema);

export default Task;
