import { Schema, model } from 'mongoose';

const integrationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Integration = model('Integration', integrationSchema);

export default Integration;

