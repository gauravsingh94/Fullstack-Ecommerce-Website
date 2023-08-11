import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, unique: true },
  firstName: String,
  lastName: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  phoneNo: String,
  orders: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
  createAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);

export default User;