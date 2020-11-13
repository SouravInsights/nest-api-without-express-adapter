import * as mongoose from 'mongoose';

export const AttendeeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
    },
    eventId: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
    },
    eventConfigResponses: [
      {
        type: Array,
      },
    ],
  },
  { timestamps: true },
);
