import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
});

export default (mongoose.models.Admin as Model<IAdmin>) ||
  mongoose.model<IAdmin>("Admin", AdminSchema);
