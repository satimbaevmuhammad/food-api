// models/restaurant.model.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

export default mongoose.model("Restaurant", restaurantSchema);
