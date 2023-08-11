import mongoose, { mongo } from "mongoose";

const ratingSchema = new mongoose.Schema({
    users:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
    number:Number
});


const Rating  = mongoose.model("Rating",ratingSchema);

export default Rating;