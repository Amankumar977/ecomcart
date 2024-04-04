import React, { useEffect, useState } from "react";
import Loader from "./Loader.jsx";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getAllCategory = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/getAllCategory`
        );
        return response.data.allCategory;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return [];
      }
    };

    getAllCategory()
      .then((allCategories) => {
        setCategories(allCategories);
        console.log("Categories loaded successfully.");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  useEffect(() => {
    // Calculate the discounted price whenever discountPercentage changes
    let discount_price = (originalPrice * discountPercentage) / 100;
    setDiscountedPrice(Math.round(originalPrice - discount_price));
  }, [originalPrice, discountPercentage]);

  let handleImageChange = (e) => {
    if (images.length === 3) {
      return toast.error("More than 3 images of product is not allowed");
    }
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length <= 1) {
      return toast.error("Images needs to be atleast 2.");
    }
    try {
      setLoading(true);
      const formData = new FormData();
      images.forEach((files) => {
        formData.append("images", files);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("originalPrice", originalPrice);
      formData.append("stock", stock);
      formData.append("discountedPrice", discountedPrice);
      formData.append("discountPercentage", discountPercentage);
      console.log(formData);
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/create-product`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          setCategory("");
          setDescription("");
          setDiscountPercentage("");
          setDiscountedPrice("");
          setImages("");
          setLoading("");
          setName("");
          setOriginalPrice("");
          setStock("");
          setTags("");
        })
        .catch((error) => {
          toast.error(error.response.data.mesage);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h5 className="text-2xl font-bold text-center mb-4">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name of the Product <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Original Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter original price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Discount Percentage <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter discount percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Discounted Price<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter original price"
            required
            value={discountedPrice}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="images"
          />
          <label
            htmlFor="images"
            className="inline-block bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 cursor-pointer">
            <AiOutlinePlusCircle className="inline-block align-middle mr-1" />
            Upload Images
          </label>
          <div className="mt-2">
            {images.length > 0
              ? images?.map((image, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {image.name}
                  </span>
                ))
              : null}
          </div>
        </div>
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
