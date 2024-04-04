import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "The category field is required"],
    unique: true, // Set unique as a boolean value
  },
});

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
