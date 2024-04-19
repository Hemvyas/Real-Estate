import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    state:{
      type:String
    },
    country: {
      type: String,
    },
    square_feet:{
      type:Number
    },
    type:{
      type:String
    },
    image: {
      type: String,
    },
    year_built:{
      type:Number
    },
    facilities: {
      type: Object,
    },
    userEmail: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Property", propertySchema);