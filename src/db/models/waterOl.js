import { model, Schema } from 'mongoose';

const waterConsumptionSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Water amount cannot be negative'],
      max: [5000, 'Water amount cannot exceed 5000 ml'],
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterCollection = model('water', waterConsumptionSchema);

export default WaterCollection;
