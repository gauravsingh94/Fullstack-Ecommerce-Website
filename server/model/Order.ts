import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    product: {type:mongoose.Schema.Types.ObjectId,ref:"Product"},
    quantity:Number
});

const Order = mongoose.model("Order",orderSchema);

export default Order;

