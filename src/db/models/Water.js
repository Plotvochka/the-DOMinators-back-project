import { Schema, model } from 'mongoose';

const waterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  amount: {
    type: Number,
    required: true,
    max: 5000,
  },
});

const WaterCollection = model('water', waterSchema);
export default WaterCollection;
