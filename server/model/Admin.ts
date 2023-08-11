import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, unique: true },
  firstName: String,
  lastName: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  phoneNo: String,
  createAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;