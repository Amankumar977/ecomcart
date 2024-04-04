import mongoose from "mongoose";
let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: [true, "Please enter the name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter the category"],
      trim: true,
    },
    tags: {
      type: String,
      required: [true, "Please enter the tags"],
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: [true, "Please enter the original Price"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please enter the discountPercentage"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please enter the discountedPrice"],
    },
    ratings: [{ type: Number }],
    sold_out: {
      type: Number,
      default: 0,
    },
    images: [{ type: String, required: true }],
    reviews: [{ type: Object }],
  },
  { timestamps: true }
);
let productModel = mongoose.model("products", productSchema);
export default productModel;
