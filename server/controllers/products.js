import uploadOnCloudinary from "../config/cloudinary.js";
import productModel from "../model/productModel.js";
export async function handleCreateProduct(req, res) {
  try {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPercentage,
      stock,
      discountedPrice,
    } = req.body;
    const images = req.files;
    if (
      !images ||
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !stock ||
      !discountPercentage ||
      !discountedPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let imageUrl = [];
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      imageUrl.push(result);
    }
    let productData = req.body;
    productData.images = imageUrl;
    const product = await productModel.create(productData);
    console.log(product);
    return res.status(201).json({
      success: true,
      message: "Product Created Succesfully",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while creating the product",
    });
  }
}
export async function handleGetAllProducts(req, res) {
  try {
    const allProducts = await productModel.find({});
    if (allProducts.length === 0) {
      return res.status(404).json({
        success: false,
        error: error.message,
        message: "No product found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products found",
      allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error ",
    });
  }
}
