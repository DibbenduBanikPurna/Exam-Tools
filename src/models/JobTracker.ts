import mongoose, { Schema, Document, Model } from "mongoose";

export type JobStatus = "Applied" | "Admit Published" | "Exam Done";

export interface IJobTracker extends Document {
  jobTitle: string;
  organization: string;
  examDate?: Date;
  status: JobStatus;
  admitCardPdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobTrackerSchema = new Schema<IJobTracker>(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, "Organization is required"],
      trim: true,
    },
    examDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: {
        values: ["Applied", "Admit Published", "Exam Done"],
        message: "{VALUE} is not a valid status",
      },
      default: "Applied",
    },
    admitCardPdfUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobTracker: Model<IJobTracker> =
  mongoose.models?.JobTracker ||
  mongoose.model<IJobTracker>("JobTracker", jobTrackerSchema);

export default JobTracker;
