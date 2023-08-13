import mongoose, { Document, Model, Types } from "mongoose";

export interface CategoryDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  product: mongoose.Types.ObjectId[];
  createAt: Date;
  updatedAt?: Date;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const Category: Model<CategoryDocument> = mongoose.model<CategoryDocument>("Category", categorySchema);

