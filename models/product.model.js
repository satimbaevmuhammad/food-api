// models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }
});

export default mongoose.model("Product", productSchema);
