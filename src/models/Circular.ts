import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICircular extends Document {
  organization: string;
  position: string;
  applicationDeadline: Date;
  circularFileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const circularSchema = new Schema<ICircular>(
  {
    organization: {
      type: String,
      required: [true, "Organization is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    circularFileUrl: {
      type: String,
      required: [true, "Circular file URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Circular: Model<ICircular> =
  mongoose.models?.Circular ||
  mongoose.model<ICircular>("Circular", circularSchema);

export default Circular;
