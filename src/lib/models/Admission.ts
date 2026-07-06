import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmission extends Document {
  studentName: string;
  email: string;
  studentMobile: string;
  fatherName: string;
  guardianMobile: string;
  collegeName: string;
  field: string;
  sessionDate: string;
  sscScore: string;
  fscPart1Score: string;
  address: string;
  city: string;
  paymentMethod: string;
  paymentProofUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    studentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    studentMobile: { type: String, required: true, trim: true },
    fatherName: { type: String, required: true, trim: true },
    guardianMobile: { type: String, required: true, trim: true },
    collegeName: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    sessionDate: { type: String, required: true },
    sscScore: { type: String, required: true, trim: true },
    fscPart1Score: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    paymentMethod: { type: String, required: true },
    paymentProofUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (mongoose.models.Admission as Model<IAdmission>) ||
  mongoose.model<IAdmission>("Admission", AdmissionSchema);
