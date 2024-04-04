import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/cart";
const ProductCard = ({ data, alt }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  const handleAddToCart = () => {
    const doesItemAlreadyExist = cart.find((item) => data._id === item._id);
    if (doesItemAlreadyExist) {
      return toast.error(
        `The item ${data.name.slice(0, 10)} is already present in the cart`
      );
    }
    const newItem = { ...data, quantity: 1 };
    dispatch(addToCart(newItem));
    toast.success(`The item ${data.name.slice(0, 10)} is added to the cart`);
  };
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/products/${product_name}`}>
        <img
          src={data.images[0]}
          alt={alt}
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/products/${product_name}`}>
        <h4 className="pb-3 font-[500] mt-4">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex ">
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`font-bold text-[18px] text-[#333] font-Roboto`}>
              ₹{" "}
              {data.originalPrice == 0
                ? data.originalPrice
                : data.discountedPrice}
            </h5>
            <h4
              className={`font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through`}>
              {data.originalPrice ? data.originalPrice + " ₹" : null}
            </h4>
          </div>
          {data.stock < 1 ? (
            <span className="font-400 text-[10px] text-[#68d284]">
              Out of stock
            </span>
          ) : (
            <span className="font-400 text-[17px] text-[#68d284]">
              {data.sold_out} sold
            </span>
          )}
        </div>
      </Link>
      {/**Side Options */}
      <div>
        <AiOutlineShoppingCart
          size={35}
          className={`${
            data.stock < 1 ? "hidden" : "block"
          } cursor-pointer absolute right-2 top-5`}
          color={"#444"}
          title="Add To Cart"
          onClick={() => {
            handleAddToCart();
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
