import * as mongoose from 'mongoose';

export const SponsorsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    websiteUrl: {
      type: String,
    },
    logo: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
