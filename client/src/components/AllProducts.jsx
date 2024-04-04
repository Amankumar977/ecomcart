import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import { toast } from "react-toastify";
const AllProducts = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fixedData, setFixedData] = useState([]);
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
    let getAllProducts = async () => {
      let allProducts = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/getAllProducts`
      );
      setData(allProducts.data.allProducts);
      setFixedData(allProducts.data.allProducts);
    };
    getAllProducts();
  }, []);
  const handleFilterByCategory = (category) => {
    let filteredData = fixedData.filter((item) => {
      return item.category.toLowerCase() === category.toLowerCase();
    });
    setData(filteredData);
  };
  return (
    <div>
      <div
        className="pt-8 flex justify-evenly
       items-start w-11/12 mx-auto flex-wrap gap-3">
        {categories &&
          categories.map(({ _id, category }) => (
            <div
              key={_id}
              className="bg-blue-300 text-white px-3 py-2 rounded-md cursor-pointer"
              onClick={() => handleFilterByCategory(category)}>
              {category}
            </div>
          ))}
      </div>
      <br />
      <br />
      <div className={`w-11/12 mx-auto`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-col-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((data) => (
              <ProductCard key={data._id} data={data} alt={data.description} />
            ))}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-3xl text-gray-500">
            We're really sorry but no product is found for this category
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default AllProducts;
