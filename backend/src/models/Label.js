import { Schema, model } from 'mongoose';

const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Label = model('Label', labelSchema);

export default Label;