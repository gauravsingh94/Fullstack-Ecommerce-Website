import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Category = mongoose.model("Category",categorySchema);

export default Category;