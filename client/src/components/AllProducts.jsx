import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
const AllProducts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let getAllProducts = async () => {
      let allProducts = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/getAllProducts`
      );
      setData(allProducts.data.allProducts);
    };
    getAllProducts();
  }, []);
  return (
    <div className="bg-[#f5f5f5]">
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
          <h1 className="text-3xl text-gray-500">Loading all Products</h1>
        ) : null}
      </div>
    </div>
  );
};

export default AllProducts;
