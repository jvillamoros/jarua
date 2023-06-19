import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
});

const Comment = model('Comment', commentSchema);

export default Comment;
