import categoryModel from "../model/categoryModel.js";
export async function handleCreateCategory(req, res) {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Please give the required details",
      });
    }
    const doesCategoryExist = await categoryModel.findOne({
      category: category.toLowerCase(),
    });
    if (doesCategoryExist) {
      return res.status(401).json({
        success: false,
        message: "The category already exist",
      });
    }
    await categoryModel.create({ category });
    return res.status(201).json({
      success: true,
      message: "The category is created",
    });
  } catch (error) {
    console.log(error.message, "This Error occured in creating category");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function handleGetAllCategory(req, res) {
  try {
    let allCategory = await categoryModel.find({});
    if (allCategory.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No Category already exist, Please create one.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category data fectched",
      allCategory,
    });
  } catch (error) {
    console.log(
      error.message,
      "This error has occured on getting  the category"
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
