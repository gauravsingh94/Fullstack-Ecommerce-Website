import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,require:true,unique:true},
    description:{type:String,require:true},
    price:{type:String,require:true},
    stock:Number,
    images:[String],
    ratings:{type:mongoose.Schema.Types.ObjectId,ref:"Rating"},
    createdAt:{type:Date,default:Date.now},
    updatedAt:Date
});

const Product = mongoose.model("Product",productSchema);

export default Product; 