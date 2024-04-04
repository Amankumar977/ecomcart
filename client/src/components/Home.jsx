import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import AllProducts from "../components/AllProducts.jsx";
const Home = () => {
  return (
    <>
      <Navbar />
      <AllProducts />
    </>
  );
};

export default Home;
