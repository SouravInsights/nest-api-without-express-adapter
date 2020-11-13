import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    tags: [
      {
        type: String,
      },
    ],
    websiteUrl: {
      type: String,
    },
  },
  { timestamps: true },
);
