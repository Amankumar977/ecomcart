import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails.jsx";
import axios from "axios";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    window.scrollTo(0, 0);
    const filteredProduct = allProducts.find(
      (product) => product.name === productName
    );
    setData(filteredProduct);
  }, [productName, allProducts]);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/getAllProducts`
        );
        setAllProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {!loading && data && <ProductDetails data={data} />}
    </div>
  );
};

export default ProductDetailsPage;
