import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    amount: {
      type: Number,
      required: true,
      max: 5000,
    },
  },
  { timestamps: true, versionKey: false },
);

waterSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.date) {
    obj.date = obj.date.toISOString().slice(0, 16);
  }
  return obj;
};

const WaterCollection = model('water', waterSchema);
export default WaterCollection;
