import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
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
      min: [0, 'Water amount cannot be negative'],
      max: [5000, 'Water amount cannot exceed 5000 ml'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterCollection = model('water', waterSchema);
export default WaterCollection;
