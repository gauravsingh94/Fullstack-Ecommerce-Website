import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    stree:String,
    city: String,
    state:String,
    zipCode:String,
    country:String,
});

const Address = mongoose.model("Address",addressSchema);

export default Address;