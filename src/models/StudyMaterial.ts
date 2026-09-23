import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudyMaterial extends Document {
  subjectName: string;
  topicTitle: string;
  pdfUrl: string;
  createdAt: Date;
}

const studyMaterialSchema = new Schema<IStudyMaterial>(
  {
    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    topicTitle: {
      type: String,
      required: [true, "Topic title is required"],
      trim: true,
    },
    pdfUrl: {
      type: String,
      required: [true, "PDF URL is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Optionally disables Mongoose auto-versioning key __v if preferred
    versionKey: false,
  }
);

// Prevent model recompilation error in Next.js hot-reloading / serverless environments
const StudyMaterial: Model<IStudyMaterial> =
  mongoose.models?.StudyMaterial ||
  mongoose.model<IStudyMaterial>("StudyMaterial", studyMaterialSchema);

export default StudyMaterial;
